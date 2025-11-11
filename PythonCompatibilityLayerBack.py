from flask import Flask, request, jsonify
from flask_cors import CORS
import PythonBackEnd
import asyncio
import traceback
import nest_asyncio
import random

app = Flask(__name__)
CORS(app)

# Enable nested event loops
nest_asyncio.apply()

# Create a single event loop for the application
loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

game_instance = None
player_character = None

def initialize_app(username=None):
    global game_instance
    game_instance = loop.run_until_complete(async_initialize(username))

async def async_initialize(username=None):
    instance = await PythonBackEnd.campaign.create_dm()
    PythonBackEnd.campaign.create_campaign_from_file(instance, instance.seed)
    instance.get_campaign()
    return instance

# Initially create with no username - will be updated when user logs in
try:
    initialize_app()
except Exception as e:
    print("Error initializing: ", e)
    raise

# Add function to reinitialize DM with character data when user logs in
def reinitialize_dm(username):
    global game_instance, player_character
    try:
        # Initialize the campaign instance
        initialize_app(username)
        
        # Load character data and create the player object
        char_attributes = loop.run_until_complete(game_instance.vb.get_character_attributes(username))
        if char_attributes:
            player_character = PythonBackEnd.player(campaign_dict=game_instance.campaign)
            player_character.attributes = {
                'Might': char_attributes.get('Might'),
                'Agility': char_attributes.get('Agility'),
                'Presence': char_attributes.get('Presence'),
                'Wisdom': char_attributes.get('Wisdom'),
                'Spirit': char_attributes.get('Spirit'),
                'Intelligence': char_attributes.get('Intelligence')
            }
        else:
            # Fallback if no character is found
            player_character = None
        
        return True
    except Exception as e:
        print("Error reinitializing DM:", e)
        return False

class userData:

    def set_info(self, name, username, password):
        self.name = name
        self.username = username
        self.password = password

    def get_username(self):
        return self.username
    
    def get_name(self):
        return self.name
    
    def get_password(self):
        return self.password
    
    async def add_user_data_to_db(self):
        return await game_instance.add_user_data(self.name, self.username, self.password)
    
    @staticmethod
    async def check_credentials(username, password):
        print(username, password)
        result = await game_instance.check_creds(username, password)
        print("From userData class: ", result)
        return result

lock = False

@app.route("/userin", methods=['POST'])
def process_message():
    global lock, game_instance, player_character, loop
    if not lock:
        try:
            lock = True
            data = request.get_json()
            message = data.get('message')
            username = data.get('username')
            step = data.get('step')

            if not game_instance:
                reinitialize_dm(username)

            if not player_character:
                # Synchronously run the async function to get character attributes
                char_attributes = loop.run_until_complete(game_instance.vb.get_character_attributes(username))
                if char_attributes:
                    # Use a temporary dictionary for attributes to avoid modifying the class-level one
                    temp_attributes = {
                        'Might': char_attributes.get('Might'),
                        'Agility': char_attributes.get('Agility'),
                        'Presence': char_attributes.get('Presence'),
                        'Wisdom': char_attributes.get('Wisdom'),
                        'Spirit': char_attributes.get('Spirit'),
                        'Intelligence': char_attributes.get('Intelligence')
                    }
                    player_character = PythonBackEnd.player(campaign_dict=game_instance.campaign)
                    player_character.attributes = temp_attributes
                else:
                    # Fallback to a default character if none is found
                    player_character = PythonBackEnd.player(campaign_dict=game_instance.campaign)
                    player_character.attributes = {'Might': 10, 'Agility': 10, 'Presence': 10, 'Wisdom': 10, 'Spirit': 10, 'Intelligence': 10}


            description, options = game_instance.scene_and_options[game_instance.turn_num]
            
            if step == 'get_roll_info':
                option_info, choice_index = game_instance.user_choice(options, message)
                if option_info == "Error":
                    return jsonify({'message': "Good-bye"}), 400
                
                choice, ability_check, dc, dice = option_info
                return jsonify({
                    'description' : f"{description}",
                    'requires_roll': True,
                    'ability': ability_check,
                    'dc': dc,
                    'dice': dice
                })

            elif step == 'get_outcome':
                roll = data.get('roll')
                option_info, choice_index = game_instance.user_choice(options, message)
                
                success, outcome_description, narration = game_instance.get_success_or_failure(game_instance.turn_num, choice_index, roll)

                if 'ability_change' in outcome_description:
                    player_character.change_ability(outcome_description['ability_change'], roll)
                    # Synchronously run the async function to update stats
                    loop.run_until_complete(game_instance.vb.update_character_stats(username, player_character.attributes))
                    
                    for ability, change in outcome_description['ability_change'].items():
                        print(type(game_instance.scene_and_options[len(game_instance.scene_and_options)-1][1]))
                        if player_character.attributes.get(ability, 0) < 1:
                            return jsonify({
                                'message': f"{game_instance.scene_and_options[len(game_instance.scene_and_options)-1][0]}",
                                'scene': "Game Over",
                                'options': [opt['option'] for opt in game_instance.scene_and_options[len(game_instance.scene_and_options)-1][1]]
                            })

                game_instance.turn_num += 1

                if game_instance.turn_num >= len(game_instance.scene_and_options):
                    return jsonify({
                        'message': f"{narration}\n\nEnd of campaign.",
                        'scene': "The campaign has ended.",
                        'options': []
                    })

                next_description, next_options = game_instance.scene_and_options[game_instance.turn_num]
                
                # Fetch the latest character data to send back to the frontend
                updated_character_data = loop.run_until_complete(game_instance.vb.get_character(username))

                return jsonify({
                    'message': f"{narration}\n\n{next_description}",
                    'scene': game_instance.get_background(),
                    'options': [opt['option'] for opt in next_options],
                    'characterData': updated_character_data[0] if updated_character_data else None
                })

        except Exception as e:
            print(f"Error processing message: {str(e)}")
            traceback.print_exc()
            return jsonify({'message': f'Error processing message: {str(e)}'}), 500
        finally:
            lock = False
    else:
        return jsonify({'message': 'DM is typing, please wait...'})

@app.route("/DMout", methods=['GET'])
def output_message():
    global game_instance
    try:
        if not game_instance:
            initialize_app()
        
        game_instance.turn_num = 0
        description, options = game_instance.scene_and_options[game_instance.turn_num]

        return jsonify({
            "dm_text": description,
            "status": "ready",
            "message": description,
            "scene": game_instance.get_background(),
            "options": [opt['option'] for opt in options]
        }), 200
    
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to load campaign start.", "details": str(e)}), 500

@app.route("/userData", methods=['POST'])
def process_userdata():
    try:
        data = request.get_json()
        user_data = userData()
        user_data.set_info(data.get('name'), data.get('username'), data.get('password'))
        
        result = loop.run_until_complete(user_data.add_user_data_to_db())

        return jsonify({"userData" : data, "status" : "ready", "message" : result}), 200

    except Exception as e:
        print("Error receiving userData", e)
        traceback.print_exc()
        return jsonify({"error": "Failed to save user data.", "details": str(e)}), 500

@app.route("/credentials", methods=['POST', 'OPTIONS'])
def check_creds():
    if request.method == 'OPTIONS':
        return '', 200
    try:
        data = request.get_json()
        username = data.get('username')
        user_creds = loop.run_until_complete(userData.check_credentials(username, data.get('password')))

        if isinstance(user_creds, bool) and user_creds:
            reinitialize_dm(username)

        return jsonify({"userCreds" : data, "status":"ready", "message" : user_creds}), 200
    
    except Exception as e:
        print("Error receiving userCreds", e)
        traceback.print_exc()
        return jsonify({"error" : "Failed to retrieve user credentials", "details" : str(e)}), 500
    
@app.route("/character-data", methods=['POST'])
def get_character_data():
    try:
        data = request.get_json()
        username = data.get('username')
        if not username:
            return jsonify({"error": "Username is required"}), 400

        character_data = loop.run_until_complete(game_instance.vb.get_character(username))
        
        # Return the first character object directly, or null if none is found
        response_data = character_data[0] if character_data else None
        
        return jsonify({"characterData": response_data}), 200
    except Exception as e:
        print("Error fetching character data:", e)
        traceback.print_exc()
        return jsonify({"error": "Failed to fetch character data", "details": str(e)}), 500

@app.route("/characters", methods=['POST'])
def process_characters():
    try:
        data = request.get_json()
        username = data.get('username')
        
        print(data)
        
        success, message = loop.run_until_complete(game_instance.bvb.add_user_character(
            username=username,
            name=data.get('name'),
            race=data.get('race'),
            char_class=data.get('class'),
            subclass=data.get('subclass'),
            strength=data.get('str'),
            dexterity=data.get('dex'),
            constitution=data.get('con'),
            intelligence=data.get('int'),
            wisdom=data.get('wis'),
            charisma=data.get('cha'),
            backstory=data.get('backstory')
        ))
        
        if not success:
            return jsonify({
                "error": "Failed to store character data",
                "details": message
            }), 400

        return jsonify({
            "characterData": data, 
            "status": "success", 
            "message": message
        }), 200
    except Exception as e:
        print("Error storing character data:", e)
        traceback.print_exc()
        return jsonify({"error": "Failed to store character data", "details": str(e)}), 500
    

@app.route("/")
def connection_message():
    return jsonify({'message': 'Connection Successful!!'}), 200

if __name__ == "__main__":
    app.run(debug=True, port=1068)