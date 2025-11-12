from quart import Quart, request, jsonify
from quart_cors import cors
import PythonBackEnd
import asyncio
import traceback
import random
from hypercorn.config import Config
from hypercorn.asyncio import serve

app = Quart(__name__)
app = cors(app, allow_origin="*")

class GameState:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
            cls._instance.game = None
            cls._instance.player_skills = None
            cls._instance.lock = asyncio.Lock()
        return cls._instance

    async def initialize_game(self, username):
        self.game_end = False
        async with self.lock:
            if self.game is None:
                print("Initializing game instance...")
                self.game = await PythonBackEnd.campaign.create_dm(username)
                print("Game instance initialized.")
    
    def get_game(self):
        return self.game

async def load_campaign(seed):
    game_state = GameState.get_instance()
    game = game_state.get_game()
    if game:
        game.create_campaign_from_file(seed)
        game.get_campaign()
        print(f"Campaign with seed {seed} loaded.")

async def load_player_character(username, campaign_data=None, use_changed_character=False):
    game_state = GameState.get_instance()
    game = game_state.get_game()
    if not game:
        await game_state.initialize_game(username)
        game = game_state.get_game()
    
    try:
        char_attributes = await game.vb.get_character_attributes(username, change=use_changed_character)
        if char_attributes:
            # Use provided campaign_data or fall back to game.campaign
            data_for_skills = campaign_data if campaign_data is not None else game.campaign
            player_character = PythonBackEnd.player(campaign_dict=data_for_skills)
            player_character.attributes = {
                'Might': char_attributes.get('Might'),
                'Agility': char_attributes.get('Agility'),
                'Presence': char_attributes.get('Presence'),
                'Wisdom': char_attributes.get('Wisdom'),
                'Spirit': char_attributes.get('Spirit'),
                'Intellect': char_attributes.get('Intellect')
            }
            game.player = player_character
            game_state.player_skills = player_character.get_skills(player_character.attributes)
            print(f"Loaded character for user: {username} with skills: {game_state.player_skills}")
        else:
            print(f"No character found for user: {username}")
            game.player = None
        return True
    except Exception as e:
        print(f"Error loading player character: {e}")
        traceback.print_exc()
        return False

class userData:
    def set_info(self, name, username, password):
        self.name = name
        self.username = username
        self.password = password

    async def add_user_data_to_db(self):
        game = GameState.get_instance().get_game()
        if game:
            return await game.add_user_data(self.name, self.username, self.password)
        return "Game instance not initialized."

    @staticmethod
    async def check_credentials(username, password):
        game = GameState.get_instance().get_game()
        if game:
            return await game.check_creds(username, password)
        return False

@app.route("/userin", methods=['POST'])
async def process_message():
    
    game_state = GameState.get_instance()
    game = game_state.get_game()
    data = await request.get_json()
    username = data.get('username')
    # Rely on the turn number established by the /seed endpoint and managed internally.
    # Do not trust the turn number from the client.
    # game.turn_num = int(data.get('turn_num'))
    
    # The player character is already loaded with the correct state (new or continued)
    # by the /seed call. We just need to ensure it's still there.
    if not hasattr(game, 'player') or game.player is None:
        await load_player_character(username, use_changed_character=True)

    print(f"GAME TURN NUMBER: {game.turn_num}")
    

    if not game or not hasattr(game, 'player'):
        
        game = game_state.get_game() # Re-fetch after potential initialization

    player_character = game.player
    if player_character is None:
        return jsonify({'message': 'Player character not initialized.'}), 500

    try:
        message = data.get('message')
        if isinstance(message, dict):
            message = message.get('option')
        step = data.get('step')
        
        # This was overwriting the character's stats with the previous turn's data.
        # By removing it, we allow the character's attributes to be modified by game events
        # and persist across turns within the same session.
        # char_attributes = await game.vb.get_character_attributes(username, True)
        # if char_attributes:
        #     player_character.attributes = char_attributes

        description, options = game.scene_and_options[game.turn_num]

        if step == 'get_roll_info':
            option_info, choice_index = game.user_choice(options, message)
            if option_info == "Error":
                return jsonify({'message': "Good-bye", 'scene': 'You may try again'}), 400
            
            choice, ability_check, dc, dice = option_info
            print(options)
            return jsonify({
                'description': description,
                'requires_roll': True,
                'ability': ability_check,
                'dc': dc,
                'dice': dice,
                'options': options
            })

        elif step == 'get_outcome':
            roll = data.get('roll')
            option_info, choice_index = game.user_choice(options, message)
            
            success, outcome_description, narration = game.get_success_or_failure(game.turn_num, choice_index, roll)

            # Check for game-ending conditions based on the current turn's outcome
            if 'ability_change' in outcome_description:
                player_character.change_ability(outcome_description['ability_change'], roll)
                await game.vb.update_character_stats(username, player_character.attributes)
                
                for ability, change in outcome_description['ability_change'].items():
                    if player_character.attributes.get(ability, 0) < 1:
                        game.game_end = True

            # Prepare the response for the current turn's outcome *before* incrementing the turn number
            response_data = {
                'message': narration,
                'scene': game.get_background(),
                'characterData': await game.vb.get_character(username, False),
                'skills': game_state.player_skills
            }

            # Now, increment the turn number for the *next* action
            game.turn_num += 1
            await game.bvb.update_campaign_turn_num(username, game.seed, game.turn_num)

            # Check if the campaign should end after this turn
            if game.turn_num >= len(game.scene_and_options) or game.game_end:
                final_message = f"{narration}\n\nEnd of campaign."
                if game.game_end and player_character.attributes.get(ability, 0) < 1:
                    final_message = f"{narration}\n\nYour {ability} has dropped to 0. You can no longer continue."
                
                return jsonify({
                    'message': final_message,
                    'scene': "The campaign has ended.",
                    'options': []
                })

            # Get the next scene's data and add it to the response
            next_description, next_options = game.scene_and_options[game.turn_num]
            response_data['message'] = f"{narration}\n\n{next_description}"
            response_data['options'] = next_options
            
            return jsonify(response_data)

    except Exception as e:
        print(f"Error processing message: {e}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {e}'}), 500

@app.route("/seed", methods=['POST'])
async def use_campaign():
    data = await request.get_json()
    seed = data.get('seed')
    username = data.get('username')
    continue_campaign = data.get('continue_campaign', False)
    
    game_state = GameState.get_instance()
    game = game_state.get_game()
    if not game:
        await game_state.initialize_game(username)
        game = game_state.get_game()

    # If it's a new campaign, reset the character change table
    if not continue_campaign:
        print(f"\nStarting new campaign for user: {username}\n")
        success, message = await game.bvb.reset_usercharchange_table(username, new_campaign=True)
        if not success:
            print(f"Warning: Failed to reset character change table for {username}: {message}")
        else:
            print(f"Character change table reset for {username}.")
    else:
        print(f"\nContinuing campaign for user: {username}\n")

    # Get or create campaign session and set turn number
    if continue_campaign:
        turn_num = await game.bvb.get_or_create_campaign_session(username, seed)
        game.turn_num = turn_num
        print(f"Loaded turn number {turn_num} for user {username} in campaign {seed}")
    else:
        # For new campaigns, the turn number is always 0.
        turn_num = 0
        game.turn_num = turn_num
        await game.bvb.get_or_create_campaign_session(username, seed) # This will create or reset to 0
        print(f"Starting new campaign at turn 0 for user {username} in campaign {seed}")

    await load_campaign(seed)
    
    # Load the correct character data based on whether the campaign is new or continued
    await load_player_character(username, use_changed_character=continue_campaign)
    
    return jsonify({"status": "ready", "message": f"Campaign with seed {seed} loaded.", "turn_num": game.turn_num})

@app.route("/DMout", methods=['GET'])
async def output_message():
    username = request.args.get('username')
    game_state = GameState.get_instance()
    game = game_state.get_game()
    game.game_end = False

    if not game:
        await game_state.initialize_game(username)
        game = game_state.get_game()
    
    if not hasattr(game, 'scene_and_options'):
        return jsonify({"error": "Campaign not loaded. Please select a campaign first."}), 400
    
    description, options = game.scene_and_options[game.turn_num]
    await load_player_character(username) # Load character to get skills

    return jsonify({
        "dm_text": description, # Adding for frontend compatibility
        "message": description,
        "scene": game.get_background(),
        "options": options,
        "skills": game_state.player_skills
    })

@app.route("/userData", methods=['POST'])
async def process_userdata():
    data = await request.get_json()
    username = data.get('username')
    game_state = GameState.get_instance()
    if not game_state.get_game():
        await game_state.initialize_game(username)
    
    user = userData()
    user.set_info(data.get('name'), username, data.get('password'))
    result = await user.add_user_data_to_db()
    return jsonify({"status": "ready", "message": result})

@app.route("/credentials", methods=['POST', 'OPTIONS'])
async def check_creds():
    if request.method == 'OPTIONS':
        return '', 200
    
    data = await request.get_json()
    username = data.get('username')
    game_state = GameState.get_instance()
    if not game_state.get_game():
        await game_state.initialize_game(username)
        
    user_creds = await userData.check_credentials(username, data.get('password'))
    if user_creds:
        await load_player_character(username)

    return jsonify({"status": "ready", "message": user_creds})

@app.route("/character-data", methods=['POST'])
async def get_character_data():
    data = await request.get_json()
    username = data.get('username')
    game_state = GameState.get_instance()
    game = game_state.get_game()
    if not game:
        await game_state.initialize_game(username)
        game = game_state.get_game()
    
    await load_player_character(username)
    character_data = await game.vb.get_character(username, False)
    return jsonify({"characterData": character_data, "skills": game_state.player_skills})

@app.route("/characters", methods=['POST'])
async def process_characters():
    data = await request.get_json()
    username = data.get('username')
    game_state = GameState.get_instance()
    game = game_state.get_game()
    if not game:
        await game_state.initialize_game(username)
        game = game_state.get_game()
    
    success, message = await game.bvb.add_user_character(
        username=username,
        name=data.get('name'),
        race=data.get('race'),
        char_class=data.get('class'),
        subclass=data.get('subclass'),
        strength=data.get('str'),
        dexterity=data.get('dex'),
        constitution=data.get('con'),
        Intellect=data.get('int'),
        wisdom=data.get('wis'),
        charisma=data.get('cha'),
        backstory=data.get('backstory')
    )
    
    if not success:
        return jsonify({"error": "Failed to store character data in userchar", "details": message}), 400

    return jsonify({"status": "success", "message": "Character created successfully."})

@app.route("/")
async def connection_message():
    return jsonify({'message': 'Connection Successful!!'})

async def main():
    config = Config()
    config.bind = ["localhost:1068"]
    await serve(app, config)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server shutting down.")