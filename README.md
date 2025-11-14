# QuestWeaver

### Credits
Dr. Adithya Kulkarni, Brandon Dean, Elijah Webb, Tierra Williams

(Please note that some of these instructions are a bit out-of-date, they get updated as often as we push out further releases)

**How to run the database:**

* Download and run Docker (Depends on your system)
* Download the current Docker image from mrpoink/dnd_vector_db:latest
* Start the Docker image
* Do the command (psql -U <username> -d <database_name> < /path/to/your/dumpfile.sql) to dump our dump file into your database (however you might want to create a database first
* Make sure the container is running on port 5432
* configure the .env in your cloned folder to have the database address (if you did the 5432 port then you can do localhost:5432)

**How to run the Back End:**

* You can either clone into this branch or the main one, whichever one you'd like
* Create a Python3.13 virtual enviornment outside of your cloned folder (It gets a bit messy if you don't)
* Run "pip install -r requirements.txt"
* Run the PythonCompatibilityLayer.py file (We should probably rename this)
  
**If you want to run the model and create your own campaign:**

* Run the SmolLM2Download.py file in the SMolLM2 folder (So you can have the tokenizer)
* Interact with the model (Yay!)
* If you have any issues with it, check out it's huggingface website (https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct)
* Ask the model to create the campaign!!
* We will update this part soon with the actual trained model and it's current training data

**How to run the front-end**

* Download Node
* Download prisma within node
* run prisma generate AFTER YOU HAVE CONFIGURED THE DOCKER IMAGE AND SCHEMA
* In the front-end folder, run (npm run dev)
* Run the CompatibilityLayer file
* Sip a drink, and take a break because you're probably going to have to do a lot of debugging and configurations with your enviornments

## Session Isolation (Multi-user / Multi-campaign)

This backend now isolates game state per user and per campaign seed to prevent crossover where two people would share scenes, characters, or turns.

- Key: each session is keyed by `(username, seed)`.
- Each session has its own `game`, `player_skills`, and `turn_num`.
- Campaign-specific character stats are stored in `USERCHARCHANGE` and are updated per campaign independently.

### API usage notes

- `POST /seed { username, seed, continue_campaign }` initializes the session, loads the campaign data, and sets the correct turn for the given `(username, seed)`.
- `POST /userin { username, seed, ... }` processes a choice and updates progress for that session only.
- `GET /DMout?username=<user>&seed=<seed>` returns the current scene/options for that exact session.
- `POST /character-data { username, seed }` returns campaign-specific character stats and derived skills.

If you do not supply `username` and `seed` to `/DMout`, the request will use a generic session and is suitable only for non-campaign views.

### Quick verification

You can run a small script to simulate two users to verify isolation (see `test_multi_session.py`).

```
python .\test_multi_session.py
```

Ensure the backend is running and the database is populated (users and characters exist) before running the script.

