from flask import Flask, request, jsonify
from flask_cors import CORS
import PythonBackEnd
import asyncio
import traceback

app = Flask(__name__)
CORS(app)

try:
    loop = asyncio.new_event_loop()

    model = loop.run_until_complete(PythonBackEnd.DungeonMaster.create_dm())
    backend = loop.run_until_complete(PythonBackEnd.DungeonMaster.create_backend())
except Exception as e:
    print("Error initializing: ", e)


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

<<<<<<< HEAD
    def roll(self, roll):
        print(roll)
        if roll == True:
            print(True)
        else:
            print(False)

        model_out = loop.run_until_complete(model.model_output_check(self.userin, roll))
        return model_out
=======
    def set_roll(self, roll):
        self.roll = roll
>>>>>>> parent of e725999 (Merge branch 'LLM-Actual' into dev)

    def send_userin(self):
        if self.check  == True:
            roll = True if int(self.userin) > 11 else False
            model_out = loop.run_until_complete(model.model_output_check(self.userin, roll))
            return model_out
        else:
            model_out = loop.run_until_complete(model.model_output(self.userin))
            return model_out if self.userin != "" else "Roll for Initiative"
    
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

        result = await backend.add_user_data(self.name, self.username, self.password)

        return result
    
    async def check_credentials(username, password):

        print(username, password)

        result = await backend.check_creds(username, password)

        print("From userData class: ", result)

        return result

    
userInput = userin()

@app.route("/userin", methods=['POST'])
def process_message():
    try:
        data = request.get_json()
        userInput.set_userin(data.get('command'))
    except Exception as e:

        return jsonify({'message': 'Something went wrong, error output on line 15'})
    
    userinput = userInput.get_userin()
    
    print(f"Python received: {userinput}")

    model_output = userInput.send_userin()

    response_text = f"{model_output}"


    return jsonify({
        'message':response_text
    })

@app.route("/DMout", methods=['GET'])
async def output_message():
    try:
        test_response = await userInput.get_userin()
        print(test_response)

        return jsonify({"dm_text" : test_response, "status":"ready"}), 200

    except Exception as e:
        print(e)

@app.route("/userData", methods=['POST'])
async def process_userdata():
    try:
        data = request.get_json()
        user_data = userData()
        user_data.set_info(data.get('name'), data.get('username'), data.get('password'))
        print(user_data.get_username(), user_data.get_name(), user_data.get_password())

        result = await user_data.add_user_data_to_db()

        return jsonify({"userData" : data, "status" : "ready", "message" : result}), 200

    except Exception as e:
        print("Error receiving userData, Line 106", e)
        traceback.print_exc()
        return jsonify({"error": "Failed to save user data.", "details": str(e)}), 500

@app.route("/credentials", methods=['POST', 'OPTIONS'])
async def check_creds():
    if request.method == 'OPTIONS':
        return '', 200
    try:
        data = request.get_json()
        user_creds = await userData.check_credentials(data.get('username'), data.get('password'))

        print(user_creds)

        return jsonify({"userCreds" : data, "status":"ready", "message" : user_creds}), 200
    
    except Exception as e:
        print("Error receiving userCreds, Line 124", e)
        traceback.print_exc()
        return jsonify({"error" : "Failed to retrieve user credentials", "details" : str(e)}), 500
    

@app.route("/")
def connection_message():
    return jsonify({'message': 'Connection Successful!!'}), 200

if __name__ == "__main__":
    app.run(debug=True, port=1068)