from quart import Quart, request, jsonify
from quart_cors import cors
import PythonBackEnd
import asyncio
import traceback
import random
import os
import logging
from hypercorn.config import Config
from hypercorn.asyncio import serve
from typing import Optional, Tuple

# Configure logging
logging.basicConfig(
    level=logging.INFO if os.getenv('PRODUCTION') else logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Quart(__name__)
# In production, you should set CORS_ORIGIN environment variable to your frontend URL
allowed_origins = os.getenv('CORS_ORIGIN', '*')
app = cors(app, allow_origin=allowed_origins)

class Session:
    def __init__(self):
        self.game = None
        self.player_skills = None
        self.turn_processed = False
        self.lock = asyncio.Lock()
        self.last_access = asyncio.get_event_loop().time()


class SessionManager:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
            # key is tuple: (username, seed_or_None)
            cls._instance.sessions = {}
        return cls._instance

    def _key(self, username: Optional[str], seed: Optional[int]):
        return (username or "__anon__", int(seed) if seed is not None else None)

    def get_session(self, username: Optional[str], seed: Optional[int]):
        key = self._key(username, seed)
        if key not in self.sessions:
            self.sessions[key] = Session()
        sess = self.sessions[key]
        sess.last_access = asyncio.get_event_loop().time()
        return sess

    async def ensure_game(self, username: Optional[str], seed: Optional[int], new_game: bool = False):
        # Opportunistic cleanup of stale sessions (30 min TTL)
        try:
            now = asyncio.get_event_loop().time()
            ttl = int(os.getenv('SESSION_TTL_SECONDS', '1800'))
            stale = [k for k, s in self.sessions.items() if (now - getattr(s, 'last_access', now)) > ttl]
            for k in stale:
                # Note: we skip explicit DB disconnects to avoid interfering with active Prisma clients
                del self.sessions[k]
        except Exception:
            pass

        session = self.get_session(username, seed)
        async with session.lock:
            if session.game is None or new_game:
                session.game = await PythonBackEnd.campaign.create_dm(username)
            session.last_access = asyncio.get_event_loop().time()
        return session

async def load_campaign(seed, session: Session):
    game = session.game
    if game:
        game.create_campaign_from_file(seed)
        game.get_campaign()

async def load_player_character(username, seed, campaign_data=None, use_changed_character=False, session: Optional[Session] = None):
    sm = SessionManager.get_instance()
    if session is None:
        session = sm.get_session(username, seed)
    game = session.game
    if not game:
        session = await sm.ensure_game(username, seed)
        game = session.game
    
    try:
        # If continuing, use changed character. If new, use base character.
        char_attributes = await game.vb.get_character_attributes(username, seed, change=use_changed_character)
        
        if not char_attributes:
             # This can happen if a user has no base character created yet.
             logger.warning(f"No character found for {username}. Cannot proceed.")
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
        session.player_skills = player_character.get_skills(player_character.attributes)
        
        return True
    except Exception as e:
        logger.error(f"Error loading player character: {e}", exc_info=True)
        return False

def get_skills(player_character):
    return player_character.get_skills(player_character.attributes)

class userData:
    def set_info(self, name, username, password):
        self.name = name
        self.username = username
        self.password = password

    async def add_user_data_to_db(self):
        # For auth operations, use a generic session keyed by username with seed=None
        sm = SessionManager.get_instance()
        session = await sm.ensure_game(self.username, None)
        if session and session.game:
            return await session.game.add_user_data(self.name, self.username, self.password)
        return "Game instance not initialized."

    @staticmethod
    async def check_credentials(username, password):
        sm = SessionManager.get_instance()
        session = await sm.ensure_game(username, None)
        if session and session.game:
            return await session.game.check_creds(username, password)
        return False

@app.route("/userin", methods=['POST'])
async def process_message():
    try:
        data = await request.get_json()
        message = data.get('message')
        username = data.get('username')
        seed = data.get('seed')
        step = data.get('step', 'get_roll_info')
        turn_num = data.get('turn_num')

        if not username:
            return jsonify({'message': 'Username is required'}), 400
        if not seed:
            return jsonify({'message': 'Campaign seed is required'}), 400

        logger.debug(f"Processing request for user: {username}, seed: {seed}, step: {step}")
        # Per-user/per-seed session
        sm = SessionManager.get_instance()
        session = await sm.ensure_game(username, int(seed) if seed is not None else None)
        game = session.game
        
        # Ensure we have the seed from the request or fallback to game.seed
        if not seed and hasattr(game, 'seed'):
            seed = game.seed
        
        # The player character is already loaded with the correct state (new or continued)
        # by the /seed call. We just need to ensure it's still there.
        if not hasattr(game, 'player') or game.player is None:
            # If the player object is missing, reload it using the 'continue' logic.
            if seed:
                await load_player_character(username, int(seed), use_changed_character=True, session=session)
            else:
                # This case should ideally not be hit if the flow starts with /seed
                return jsonify({'message': 'Game session not properly initialized. Please start a campaign.'}), 500

        logger.debug(f"GAME TURN NUMBER: {game.turn_num}")

        player_character = game.player
        if player_character is None:
            return jsonify({'message': 'Player character not initialized.'}), 500
        if isinstance(message, dict):
            message = message.get('option')
        step = data.get('step')
        
        # note: character attributes are loaded once at session start and maintained in memory
        # we don't reload them here because that would overwrite any changes made during gameplay
        # stats persist per-campaign through the usercharchange table, not across campaigns
        
        description, options = game.scene_and_options[game.turn_num]
        
        logger.debug(f"Processing step: {step} for user: {username} at turn {game.turn_num} with narration: {description}")

        if step == 'get_roll_info':
            option_info, choice_index = game.user_choice(options, message)
            if option_info == "Error":
                return jsonify({'message': "Good-bye", 'scene': 'You may try again'}), 400
            
            choice, ability_check, dc, dice = option_info
            # Enrich with success/failure narrations and ability change for UI preview
            skills = get_skills(player_character)
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
                'options': options,
                'skills': skills
            })

        elif step == 'get_outcome':

            roll = data.get('roll')
            option_info, choice_index = game.user_choice(options, message)
            
            success, outcome_description, narration = game.get_success_or_failure(game.turn_num, choice_index, roll)

            # apply ability changes from this turn's outcome
            if 'ability_change' in outcome_description:
                player_character.change_ability(outcome_description['ability_change'], roll, success)
                
                # save the modified stats to this campaign's usercharchange row
                # important: stats are isolated per campaign - changes in campaign 3 don't affect campaign 4
                campaign_seed = int(seed) if seed else game.seed
                await game.vb.update_character_stats(username, player_character.attributes, campaign_seed)
                
                # check if any attribute dropped to 0 or below (game over condition)
                for ability_name, change in outcome_description['ability_change'].items():
                    if player_character.attributes.get(ability_name, 0) < 1:
                        game.game_end = True
            
            session.turn_processed = True
            
            skills = get_skills(player_character)
            session.player_skills = skills  # Update the game state with new skills

            # prepare response with current turn's results
            response_data = {
                'message': narration,
                'scene': game.get_background(),
                'characterData': await game.vb.get_character(username, int(seed) if seed else game.seed, True),
                'skills': skills  # Return the newly calculated skills
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
        logger.error(f"Error processing message: {e}", exc_info=True)
        return jsonify({'message': f'Error: {str(e)}'}), 500

@app.route("/seed", methods=['POST'])
async def use_campaign():
    try:
        data = await request.get_json()
        seed = data.get('seed')
        username = data.get('username')
        continue_campaign = data.get('continue_campaign', False)

        if seed is None or username is None:
            return jsonify({"status": "error", "message": "username and seed are required"}), 400

        try:
            seed_int = int(seed)
        except Exception:
            return jsonify({"status": "error", "message": "seed must be an integer"}), 400

        sm = SessionManager.get_instance()
        session = await sm.ensure_game(username, seed_int, new_game=True)
        game = session.game

        # check for existing session for (username, seed)
        db_session = await game.bvb.db.campaignsession.find_unique(
            where={'seed_user': {'seed': str(seed_int), 'user': username}}
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
        if db_session:
            existing_userchar = await game.bvb.db.usercharchange.find_first(
                where={'user': username, 'campaignId': db_session.id, 'name': base_char.name}
            )
            userchar_exists = existing_userchar is not None
        
        # first time playing this campaign -> clone base stats into USERCHARCHANGE
        if not userchar_exists:
            logger.info(f"first time playing campaign {seed_int} for user {username}. creating fresh usercharchange from base character.")
            success, message = await game.bvb.reset_usercharchange_table(username, seed_int, new_campaign=True)
            if not success:
                logger.error(f"error: failed to create character sheet for campaign {seed_int}: {message}")
                return jsonify({"status": "error", "message": "failed to initialize character for the campaign."}), 500
        else:
            logger.info(f"user {username} has played campaign {seed_int} before. loading existing usercharchange stats.")
        
        # load the saved turn number from the database for this (user, seed)
        completed_turn_num, last_context, error = await game.bvb.get_or_create_campaign_session(username, seed_int)
        if error:
            return jsonify({"status": "error", "message": error}), 500
        
        # determine starting turn based on saved progress
        has_played_before = completed_turn_num > 0
        
        if continue_campaign or has_played_before:
            game.turn_num = completed_turn_num
            logger.info(
                f"loading campaign {seed_int} at turn {game.turn_num} (continuing from turn {completed_turn_num - 1 if completed_turn_num > 0 else 0})"
            )
        else:
            game.turn_num = 0
            logger.info(f"starting fresh campaign {seed_int} at turn 0")

        game.seed = seed_int
        session.turn_processed = False
        await load_campaign(seed_int, session)
        
        # Always load the per-campaign change sheet after ensuring it's reset/created
        await load_player_character(username, seed_int, use_changed_character=True, session=session)
        
        return jsonify({"status": "ready", "message": f"Campaign with seed {seed_int} loaded.", "turn_num": game.turn_num})
    except Exception as e:
        logger.error(f"Error in /seed: {e}", exc_info=True)
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/DMout", methods=['GET'])
async def output_message():
    username = request.args.get('username')
    seed = request.args.get('seed', type=int)
    sm = SessionManager.get_instance()
    session = await sm.ensure_game(username, seed)
    game = session.game
    game.game_end = False

    if not hasattr(game, 'scene_and_options'):
        return jsonify({"error": "Campaign not loaded. Please select a campaign first."}), 400
    
    session.turn_processed = False

    description, options = game.scene_and_options[game.turn_num]

    return jsonify({
        "dm_text": description, # Adding for frontend compatibility
        "message": description,
        "scene": game.get_background(),
        "options": options,
        "skills": session.player_skills,
        "turn_num": getattr(game, 'turn_num', 0)
    })

@app.route("/userData", methods=['POST'])
async def process_userdata():
    data = await request.get_json()
    username = data.get('username')
    # char_name is not needed for creating a user account
    sm = SessionManager.get_instance()
    await sm.ensure_game(username, None)
    
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
    sm = SessionManager.get_instance()
    await sm.ensure_game(username, None)
        
    user_creds = await userData.check_credentials(username, data.get('password'))
    
    if user_creds:
        # If credentials are correct, get the list of characters for the user
        game = sm.get_session(username, None).game
        characters = await game.vb.get_all_characters_for_user(username)
        return jsonify({"status": "ready", "message": True, "characters": characters})

    return jsonify({"status": "ready", "message": user_creds})

@app.route("/character-data", methods=['POST'])
async def get_character_data():
    data = await request.get_json()
    username = data.get('username')
    seed = data.get('seed') # Expect seed from frontend
    sm = SessionManager.get_instance()
    session = await sm.ensure_game(username, int(seed) if seed is not None else None)
    game = session.game
    
    # Pass seed to load_player_character
    await load_player_character(username, seed, use_changed_character=True, session=session)
    # Pass seed to get_character
    character_data = await game.vb.get_character(username, seed, True)
    return jsonify({"characterData": character_data, "skills": session.player_skills})

@app.route("/characters", methods=['POST'])
async def process_characters():
    data = await request.get_json()
    username = data.get('username')
    char_name = data.get('name')
    sm = SessionManager.get_instance()
    session = await sm.ensure_game(username, None)
    game = session.game
    
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
        backstory=data.get('backstory'),
        iconId=data.get('icon', 0)
    )
    
    if not success:
        return jsonify({"error": "Failed to store character data in userchar", "details": message}), 400

    return jsonify({"status": "success", "message": "Character created successfully."})

@app.route("/")
async def connection_message():
    return jsonify({'message': 'Connection Successful!!', 'status': 'healthy'})

async def main():
    config = Config()
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 1068))
    config.bind = [f"{host}:{port}"]
    logger.info(f"Starting server on {host}:{port}")
    await serve(app, config)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Server shutting down gracefully.")