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

def initialize_app():
    return loop.run_until_complete(async_initialize())

async def async_initialize():
    model = await PythonBackEnd.DungeonMaster.create_dm()
    backend = await PythonBackEnd.DungeonMaster.create_backend()
    return model, backend

try:
    model, backend = initialize_app()
except Exception as e:
    print("Error initializing: ", e)
    raise


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
    global lock
    if not lock:
        try:
            data = request.get_json()
            userInput.set_userin(data.get('message'))
            lock = True
        except Exception as e:
            return jsonify({'message': 'Something went wrong, error output on line 15'})
        
        userinput = userInput.get_userin()
        
        print(f"Python received: {userinput}")

        model_output = userInput.send_userin()

        lock = False
        return jsonify({
            'message':model_output,
            'scene': userInput.get_scene()
        })
    else:
        return jsonify({'message': 'DM is typing, please wait...'})

@app.route("/DMout", methods=['GET'])
def output_message():
    global lock
    try:
        lock = False
        scene = userInput.get_scene()
        initial_message = "Welcome to the game! What would you like to do?"

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
        user_creds = loop.run_until_complete(userData.check_credentials(data.get('username'), data.get('password')))

        print(user_creds)

        return jsonify({"userCreds" : data, "status":"ready", "message" : user_creds}), 200
    
    except Exception as e:
        print("Error receiving userCreds, Line 124", e)
        traceback.print_exc()
        return jsonify({"error" : "Failed to retrieve user credentials", "details" : str(e)}), 500
    
@app.route("/characters", methods=['POST'])
def process_characters():
    try:
        data = request.get_json()
        print("Received character data: ", data)
        return jsonify({"characterData" : data, "status":"ready", "message" : "Character data received"}), 200
    except Exception as e:
        print("Error receiving character data, Line 144", e)
        traceback.print_exc()
        return jsonify({"error" : "Failed to retrieve character data", "details" : str(e)}), 500
    

@app.route("/")
def connection_message():
    return jsonify({'message': 'Connection Successful!!'}), 200

if __name__ == "__main__":
    app.run(debug=True, port=1068)