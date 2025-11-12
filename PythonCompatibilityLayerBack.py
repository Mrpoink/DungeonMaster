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
            cls._instance.turn_processed = False
        return cls._instance

    async def initialize_game(self, username, new_game=False):
        self.game_end = False
        async with self.lock:
            if self.game is None or new_game:
                self.game = await PythonBackEnd.campaign.create_dm(username)
    
    def get_game(self):
        return self.game

async def load_campaign(seed):
    game_state = GameState.get_instance()
    game = game_state.get_game()
    if game:
        game.create_campaign_from_file(seed)
        game.get_campaign()

async def load_player_character(username, seed, campaign_data=None, use_changed_character=False):
    game_state = GameState.get_instance()
    game = game_state.get_game()
    if not game:
        await game_state.initialize_game(username)
        game = game_state.get_game()
    
    try:
        # If continuing, use changed character. If new, use base character.
        char_attributes = await game.vb.get_character_attributes(username, seed, change=use_changed_character)
        
        if not char_attributes:
             # This can happen if a user has no base character created yet.
             print(f"No character found for {username}. Cannot proceed.")
             game.player = None
             return False

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
    seed = data.get('seed')  # Frontend now sends this
    
    # Ensure we have the seed from the request or fallback to game.seed
    if not seed and hasattr(game, 'seed'):
        seed = game.seed
    
    # The player character is already loaded with the correct state (new or continued)
    # by the /seed call. We just need to ensure it's still there.
    if not hasattr(game, 'player') or game.player is None:
        # If the player object is missing, reload it using the 'continue' logic.
        if seed:
            await load_player_character(username, int(seed), use_changed_character=True)
        else:
            # This case should ideally not be hit if the flow starts with /seed
            return jsonify({'message': 'Game session not properly initialized. Please start a campaign.'}), 500

    print(f"GAME TURN NUMBER: {game.turn_num}\n")
    

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
        
        # note: character attributes are loaded once at session start and maintained in memory
        # we don't reload them here because that would overwrite any changes made during gameplay
        # stats persist per-campaign through the usercharchange table, not across campaigns
        
        description, options = game.scene_and_options[game.turn_num]
        
        print(f"Processing step: {step} for user: {username} at turn {game.turn_num} with narration: {description}\n")

        if step == 'get_roll_info':
            option_info, choice_index = game.user_choice(options, message)
            if option_info == "Error":
                return jsonify({'message': "Good-bye", 'scene': 'You may try again'}), 400
            
            choice, ability_check, dc, dice = option_info
            # Enrich with success/failure narrations and ability change for UI preview
            return jsonify({
                'description': description,
                'requires_roll': True,
                'ability': ability_check,
                'dc': dc,
                'dice': dice,
                'success_narration': choice.get('success', {}).get('narration'),
                'failure_narration': choice.get('failure', {}).get('narration'),
                'success_ability_change': choice.get('success', {}).get('ability_change'),
                'failure_ability_change': choice.get('failure', {}).get('ability_change'),
                'options': options
            })

        elif step == 'get_outcome':

            roll = data.get('roll')
            option_info, choice_index = game.user_choice(options, message)
            
            success, outcome_description, narration = game.get_success_or_failure(game.turn_num, choice_index, roll)

            # apply ability changes from this turn's outcome
            if 'ability_change' in outcome_description:
                player_character.change_ability(outcome_description['ability_change'], roll)
                
                # save the modified stats to this campaign's usercharchange row
                # important: stats are isolated per campaign - changes in campaign 3 don't affect campaign 4
                campaign_seed = int(seed) if seed else game.seed
                await game.vb.update_character_stats(username, player_character.attributes, campaign_seed)
                
                # check if any attribute dropped to 0 or below (game over condition)
                for ability_name, change in outcome_description['ability_change'].items():
                    if player_character.attributes.get(ability_name, 0) < 1:
                        game.game_end = True
            
            game_state.turn_processed = True

            # prepare response with current turn's results
            response_data = {
                'message': narration,
                'scene': game.get_background(),
                'characterData': await game.vb.get_character(username, int(seed) if seed else game.seed, True),
                'skills': game_state.player_skills
            }
            
            # increment turn counter for next action
            # important: we increment BEFORE saving so the saved value is the next turn to play
            game.turn_num += 1
            
            # persist the new turn number to the database
            # this ensures when the user returns, they continue from where they left off
            await game.bvb.update_campaign_turn_num(username, game.seed, game.turn_num, narration)

            # check if we've reached the end of the campaign
            if game.turn_num >= len(game.scene_and_options) or game.game_end:
                final_message = f"{narration}\n\nend of campaign."
                if game.game_end:
                    # find which attribute caused the game over
                    zero_attrs = [k for k, v in player_character.attributes.items() if v is not None and v < 1]
                    if zero_attrs:
                        final_message = f"{narration}\n\nyour {zero_attrs[0]} has dropped to 0. you can no longer continue."
                
                return jsonify({
                    'message': final_message,
                    'scene': "the campaign has ended.",
                    'options': []
                })

            # fetch the next scene and add it to the response
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
    await game_state.initialize_game(username, new_game=True)
    game = game_state.get_game()

    # check if this user has a campaign-specific character sheet (usercharchange) for this seed
    # userchar = base character template (never changes)
    # usercharchange = per-campaign instance with modified stats and turn progress
    session = await game.bvb.db.campaignsession.find_unique(
        where={'seed_user': {'seed': str(seed), 'user': username}}
    )
    
    # get the user's most recently created character from userchar table
    base_char = await game.bvb.db.userchar.find_first(
        where={'user': username},
        order={'id': 'desc'}  # latest character by id
    )
    
    if not base_char:
        return jsonify({"status": "error", "message": "no character found. please create a character first."}), 400
    
    # check if a campaign-specific character sheet already exists
    userchar_exists = False
    if session:
        existing_userchar = await game.bvb.db.usercharchange.find_first(
            where={'user': username, 'campaignId': session.id, 'name': base_char.name}
        )
        userchar_exists = existing_userchar is not None
    
    # if this is the first time playing this campaign, create a fresh usercharchange row
    # this copies the base character's stats and links them to this specific campaign
    if not userchar_exists:
        print(f"first time playing campaign {seed} for user {username}. creating fresh usercharchange from base character.")
        success, message = await game.bvb.reset_usercharchange_table(username, seed, new_campaign=True)
        if not success:
            print(f"error: failed to create character sheet for campaign {seed}: {message}")
            return jsonify({"status": "error", "message": "failed to initialize character for the campaign."}), 500
    else:
        print(f"user {username} has played campaign {seed} before. loading existing usercharchange stats.")
    
    # load the saved turn number from the database
    # completed_turn_num contains the NEXT turn to play (we incremented before saving)
    completed_turn_num, last_context, error = await game.bvb.get_or_create_campaign_session(username, seed)
    if error:
        return jsonify({"status": "error", "message": error}), 500
    
    # determine starting turn based on saved progress
    has_played_before = completed_turn_num > 0
    
    if continue_campaign or has_played_before:
        # continue from saved position - completed_turn_num is already the next turn to play
        # we don't add 1 here because we incremented before saving in /userin
        game.turn_num = completed_turn_num
        print(f"loading campaign {seed} at turn {game.turn_num} (continuing from turn {completed_turn_num - 1 if completed_turn_num > 0 else 0})")
    else:
        # brand new campaign, start at the beginning
        game.turn_num = 0
        print(f"starting fresh campaign {seed} at turn 0")

    game.seed = seed
    game_state.turn_processed = False
    await load_campaign(seed)
    
    # Always load the per-campaign change sheet after ensuring it's reset/created
    # (For a new campaign the USERCHARCHANGE row was just cloned from base stats.)
    await load_player_character(username, seed, use_changed_character=True)
    
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
    
    game_state.turn_processed = False

    description, options = game.scene_and_options[game.turn_num]
    # Character should already be loaded from the /seed call.
    # await load_player_character(username) # Load character to get skills

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
    # char_name is not needed for creating a user account
    game_state = GameState.get_instance()
    if not game_state.get_game():
        # We can initialize with a dummy char_name, as it's not used for user creation
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
        # We can initialize with a dummy char_name, as it's not used for credential check
        await game_state.initialize_game(username)
        
    user_creds = await userData.check_credentials(username, data.get('password'))
    
    if user_creds:
        # If credentials are correct, get the list of characters for the user
        game = game_state.get_game()
        characters = await game.bvb.get_all_characters_for_user(username)
        return jsonify({"status": "ready", "message": True, "characters": characters})

    return jsonify({"status": "ready", "message": user_creds})

@app.route("/character-data", methods=['POST'])
async def get_character_data():
    data = await request.get_json()
    username = data.get('username')
    seed = data.get('seed') # Expect seed from frontend
    game_state = GameState.get_instance()
    game = game_state.get_game()
    if not game:
        await game_state.initialize_game(username)
        game = game_state.get_game()
    
    # Pass seed to load_player_character
    await load_player_character(username, seed, use_changed_character=True)
    # Pass seed to get_character
    character_data = await game.vb.get_character(username, seed, True)
    return jsonify({"characterData": character_data, "skills": game_state.player_skills})

@app.route("/characters", methods=['POST'])
async def process_characters():
    data = await request.get_json()
    username = data.get('username')
    char_name = data.get('name')
    game_state = GameState.get_instance()
    game = game_state.get_game()
    if not game:
        await game_state.initialize_game(username)
        game = game_state.get_game()
    
    success, message = await game.bvb.add_user_character(
        username=username,
        name=char_name,
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
    config.bind = ["0.0.0.0:1068"]
    await serve(app, config)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server shutting down.")