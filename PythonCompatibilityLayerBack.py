from flask import Flask, request, jsonify
from flask_cors import CORS
import PythonBackEnd
import asyncio
import traceback
import nest_asyncio

app = Flask(__name__)
CORS(app)

# Enable nested event loops
nest_asyncio.apply()

# Create a single event loop for the application
loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

def initialize_app(username=None):
    return loop.run_until_complete(async_initialize(username))

async def async_initialize(username=None):
    model = await PythonBackEnd.DungeonMaster.create_dm(username)
    backend = await PythonBackEnd.DungeonMaster.create_backend()
    return model, backend

# Initially create with no username - will be updated when user logs in
try:
    model, backend = initialize_app()
except Exception as e:
    print("Error initializing: ", e)
    raise

# Add function to reinitialize DM with character data when user logs in
def reinitialize_dm(username):
    global model, backend
    try:
        model, backend = initialize_app(username)
        return True
    except Exception as e:
        print("Error reinitializing DM:", e)
        return False


turn_num = 0

class userin:

    def __init__(self):
        self.userin = ""
        self.check = None

    def set_userin(self, input):
        self.userin = input

    def get_userin(self):
        try:
            int(self.userin)
            print(True)
            self.check=True
            return self.userin
        except ValueError:
            print(False)
            self.check=False
            return self.userin

        # model_out = loop.run_until_complete(model.model_output(self.userin))
        # return model_out if self.userin != "" else "Roll for Initiative"

    def get_scene(self):
        return model.scene

    def roll(self, roll):
        print(roll)
        if roll == True:
            print(True)
        else:
            print(False)
        return loop.run_until_complete(model.model_output_check(self.userin, roll))

    def send_userin(self):
        if self.check == True:
            roll = True if int(self.userin) > 11 else False
            return loop.run_until_complete(model.model_output_check(self.userin, roll))
        else:
            result = loop.run_until_complete(model.model_output(self.userin))
            return result if self.userin != "" else "Roll for Initiative"
    
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
    
    def get_scene(self):
        return model.get_scene()
    
    async def add_user_data_to_db(self):

        return loop.run_until_complete(backend.add_user_data(self.name, self.username, self.password))
    
    @staticmethod
    async def check_credentials(username, password):

        print(username, password)

        result = loop.run_until_complete(backend.check_creds(username, password))

        print("From userData class: ", result)

        return result

    
userInput = userin()

lock = False

@app.route("/userin", methods=['POST'])
def process_message():
    global lock, model
    if not lock:
        try:
            data = request.get_json()
            userInput.set_userin(data.get('message'))
            username = data.get('username', 'User')
            
            # Reinitialize DM with username to get character data if not already done
            if model and hasattr(model, 'player') and model.player == "[/PLAYER]: A wandering adventurer seeking their destiny":
                model, _ = initialize_app(username)
            
            lock = True
        except Exception as e:
            return jsonify({'message': 'Something went wrong, error output on line 15'})
        
        userinput = userInput.get_userin()
        
        print(f"Python received from {username}: {userinput}")

        model_output = userInput.send_userin()

        lock = False
        return jsonify({
            'message': model_output,
            'scene': userInput.get_scene(),
            'username': username
        })
    else:
        return jsonify({'message': 'DM is typing, please wait...'})

@app.route("/DMout", methods=['GET'])
def output_message():
    global lock
    try:
        lock = False
        scene = userInput.get_scene()
        initial_message = scene

        lock = False
        return jsonify({
            "dm_text": initial_message,
            "status": "ready",
            "message": initial_message,
            "scene": scene
        }), 200
    
    except Exception as e:
        print(e)

@app.route("/userData", methods=['POST'])
def process_userdata():
    try:
        data = request.get_json()
        user_data = userData()
        user_data.set_info(data.get('name'), data.get('username'), data.get('password'))
        print(user_data.get_username(), user_data.get_name(), user_data.get_password())

        result = loop.run_until_complete(user_data.add_user_data_to_db())

        return jsonify({"userData" : data, "status" : "ready", "message" : result}), 200

    except Exception as e:
        print("Error receiving userData, Line 106", e)
        traceback.print_exc()
        return jsonify({"error": "Failed to save user data.", "details": str(e)}), 500


@app.route("/roll", methods=['POST'])
def process_roll():
    global lock
    print(f"Lock is: {lock}")
    if not lock:
        try:
            data = request.get_json()
            model_output = userInput.roll(data.get('command'))

            response_text = f"{model_output}"

            return jsonify({
                'message':response_text
            })
        
        except Exception as e:
            return jsonify({'message': 'Something went wrong, error output on line 15'})
    else:
        return jsonify({'message': 'DM is typing, please wait...'})
    

@app.route("/credentials", methods=['POST', 'OPTIONS'])
def check_creds():
    if request.method == 'OPTIONS':
        return '', 200
    try:
        data = request.get_json()
        username = data.get('username')
        user_creds = loop.run_until_complete(userData.check_credentials(username, data.get('password')))

        print(user_creds)

        # If login successful, reinitialize DM with character data
        if isinstance(user_creds, bool) and user_creds:
            reinitialize_dm(username)

        return jsonify({"userCreds" : data, "status":"ready", "message" : user_creds}), 200
    
    except Exception as e:
        print("Error receiving userCreds, Line 124", e)
        traceback.print_exc()
        return jsonify({"error" : "Failed to retrieve user credentials", "details" : str(e)}), 500
    
@app.route("/character-data", methods=['POST'])
def get_character_data():
    try:
        data = request.get_json()
        username = data.get('username')
        if not username:
            return jsonify({"error": "Username is required"}), 400

        character_data = loop.run_until_complete(model.vb.get_character(username))
        return jsonify({"characterData": character_data}), 200
    except Exception as e:
        print("Error fetching character data:", e)
        traceback.print_exc()
        return jsonify({"error": "Failed to fetch character data", "details": str(e)}), 500

@app.route("/characters", methods=['POST'])
def process_characters():
    try:
        data = request.get_json()
        username = data.get('username')
        
        # Store character data in database
        success, message = loop.run_until_complete(backend.bvb.add_user_character(
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