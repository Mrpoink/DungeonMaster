import json
import pgvector
import tracemalloc
import sys
import os
import numpy as np
import torch

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'prisma', 'generated'))

from prisma import Prisma
from prisma.errors import RawQueryError
import asyncio
from sentence_transformers import SentenceTransformer as st



class use_vector_db:

    def __init__(self):
        tracemalloc.start()
        self.db = Prisma()


    async def connect(self):
        await self.db.connect()


    def create_data(self, json_file : str):

        with open(json_file, 'r') as file:
            data = json.load(file)

        self.data_list = []

        #Creating the strings to put into transformer
        for name in data.keys():
            
            #Name is actual name
            print(f"Name: {name}")

            attributes = ""

            for object in data[name].keys():

                #Object is the value of the attribute while data[name] key is the attribute

                if data[name][object] != "":

                    attributes = f"{attributes}, {object} : {data[name][object].replace("\n", "")}"
            
            monster = f"{name} has {attributes}"

            self.data_list.append(monster)


    def make_embedding(self, model : str):
        model = st(model, device="cuda")
        #Turns model into sentence piece transformer

        data = self.data_list
        self.embeddings = model.encode(data)
        #returns embeddings


    def get_similarities(self, embedding1, embedding2):
        #Not really used often

        sims = self.model.similarity(embedding1, embedding2)

        return sims
    

    def create_query(self):
        self.query_tuple_list = []

        for i in range(len(self.data_list)):

            tuple = (str(self.data_list[i]), self.embeddings[i].tolist())
            #Creates (text, embedding) tuple, valuable for quick integration in the database

            self.query_tuple_list.append(tuple)

        return self.query_tuple_list
    
    
    async def add_to_db(self, databasename: str, json_file : str, model : str):

        self.create_data(json_file)

        self.make_embedding(model)

        self.create_query()
    
        for text, embedding in self.query_tuple_list:
            await self.db.execute_raw(
                f"INSERT INTO \"{databasename}\" (text, embedding) VALUES ($1, $2)",
                text,
                embedding
            )

        print("Successfully updated!")

        await self.db.disconnect()

    async def add_user_data(self, name, username, password):

        try:

            await self.db.execute_raw(
                f'INSERT INTO \"USERDATA\" (name, username, password) VALUES ($1, $2, $3)',
                name,
                username,
                password
            )

        except RawQueryError:
            print("Failed to add user data: Username already exists")
            return False, "Username already exists"
        
        return True, "User successfully added"

    async def check_user_data(self, username, password):

        result = await self.db.query_raw(
            f"SELECT password FROM \"USERDATA\" WHERE username = '{username}'"
        )

        print("From vector_db: ", result)

        try:

            if result[0]['password'] == password:
                return True
            else:
                return False, "Incorrect password"
        except IndexError:
            return False, "Incorrect username"
        except RawQueryError:
            return False, "Name already exists"
        
    async def add_user_character(self, username, name, race, char_class, subclass, strength, dexterity, constitution, Intellect, wisdom, charisma, backstory):
        try:
            # The raw SQL query to insert a new character into the base table.
            await self.db.userchar.create(
                data={
                    "user": username,
                    "name": name,
                    "race": race,
                    "cla": char_class,
                    "subclass": subclass or "",
                    "str": int(float(strength)),
                    "dex": int(float(dexterity)),
                    "con": int(float(constitution)),
                    "int": int(float(Intellect)),
                    "wis": int(float(wisdom)),
                    "cha": int(float(charisma)),
                    "backstory": backstory or ""
                }
            )
            
            print(f"Successfully created character {name} for user {username} in USERCHAR")
            return True, "Character successfully created"

        except ValueError as e:
            print(f"Invalid data format: {e}")
            return False, "Invalid stat values. Please ensure all stats are numbers."
        except RawQueryError as e:
            error_msg = str(e)
            print(f"Failed to add user character data: {error_msg}")
            if 'violates foreign key constraint' in error_msg:
                return False, f"User {username} does not exist. Please create an account first."
            elif 'violates unique constraint' in error_msg:
                return False, f"A character named {name} already exists for this user. Please choose a different name."
            else:
                return False, f"Database error: {error_msg}"
        except Exception as e:
            error_msg = str(e)
            print(f"An unexpected error occurred: {error_msg}")
            return False, f"An unexpected error occurred: {error_msg}"
        
    async def get_or_create_campaign_session(self, username: str, seed: int):
        """
        Gets or creates a campaign session for a user and a seed.
        Returns the turn number for the ACTIVE CHARACTER (last created) in this campaign.
        NOTE: Schema has unique constraint on (seed, user) only. We treat the
        "active" character as the last one the user created (highest id in USERCHAR).
        """
        try:
            # Last created character for the user (used implicitly for campaign)
            character = await self.db.userchar.find_first(
                where={'user': username},
                order={'id': 'desc'}
            )
            if not character:
                return 0, None, f"No character found for user {username}. Please create one first."
            char_name = character.name

            # Compound unique selector name generated by Prisma: seed_user
            session = await self.db.campaignsession.find_unique(
                where={'seed_user': {'seed': str(seed), 'user': username}}
            )

            if session:
                # Find the USERCHARCHANGE for this character in this campaign to get their turn number
                char_in_campaign = await self.db.usercharchange.find_first(
                    where={'user': username, 'campaignId': session.id, 'name': char_name},
                    order={'id': 'desc'}
                )
                if char_in_campaign and char_in_campaign.current_turn is not None:
                    turn_num = char_in_campaign.current_turn
                else:
                    turn_num = 0
                last_context = session.last_context
                print(f"Found existing session for user {username} seed {seed} (character {char_name}) turn_num {turn_num}\n")
                return turn_num, last_context, None

            # Create new session (no characterId field in schema)
            new_session = await self.db.campaignsession.create(
                data={'user': username, 'seed': str(seed)}
            )
            print(f"Created new session for user {username} seed {seed} with initial turn 0 (character {char_name})")
            return 0, None, None
        except Exception as e:
            print(f"Error in get_or_create_campaign_session: {e}")
            return 0, None, str(e)

    async def update_campaign_turn_num(self, username: str, seed: int, turn_num: int, last_context: str):
        """
            saves turn progress to the usercharchange row for this campaign
            each (user, character, campaign) combination has independent turn tracking
            turn_num should already be incremented before calling this function
        """
        try:
                # find the user's most recent character
            character = await self.db.userchar.find_first(
                where={'user': username},
                order={'id': 'desc'}
            )
            if not character:
                    return False, f"no character found for user {username}."
            
                # get the campaign session for this seed
            session = await self.db.campaignsession.find_unique(
                where={'seed_user': {'seed': str(seed), 'user': username}}
            )
            if session:
                    # find the campaign-specific character sheet
                char_in_campaign = await self.db.usercharchange.find_first(
                    where={'user': username, 'campaignId': session.id, 'name': character.name},
                    order={'id': 'desc'}
                )
                
                if char_in_campaign:
                        # save the new turn number to the database
                    await self.db.usercharchange.update(
                        where={'id': char_in_campaign.id},
                        data={'current_turn': int(turn_num)}
                    )
                    print(f"updated turn_num to {turn_num} for character {character.name} (user {username}) in seed {seed}")
                else:
                        print(f"error: no usercharchange found for character {character.name} in campaign {seed}")
                        return False, "character not found in campaign."
                
                    # update the session's last context for continuity
                await self.db.campaignsession.update(
                    where={'id': session.id},
                    data={'last_context': last_context}
                )
                return True, None
            else:
                    print(f"could not find session to update for user {username} seed {seed}")
                    return False, "session not found."
        except Exception as e:
                print(f"error updating turn_num: {e}")
                return False, str(e)

    async def reset_usercharchange_table(self, username: str, seed: int, new_campaign: bool = True):
        """
            creates a fresh usercharchange record for a new campaign session
            copies base character stats from userchar and links to the campaign session
            each campaign gets its own isolated character sheet - stats don't carry over
        """
        if not new_campaign:
                print(f"continuing campaign for {username}. not resetting usercharchange.")
                return True, "continuing campaign."
        
        try:
                # fetch the base character template from userchar (most recent character)
            original_character = await self.db.userchar.find_first(
                where={'user': username},
                order={'id': 'desc'}
            )

            if not original_character:
                    return False, f"no base character found for user {username}."

                # get or create the campaign session record
                # campaignsession links (user, seed) to a unique session id
            session = await self.db.campaignsession.find_unique(
                where={'seed_user': {'seed': str(seed), 'user': username}}
            )
            if not session:
                session = await self.db.campaignsession.create(
                    data={'user': username, 'seed': str(seed)}
                )
                print(f"created new session for user {username} seed {seed} during reset.")

                # check if a campaign-specific character sheet already exists
            change_character = await self.db.usercharchange.find_first(
                where={'user': username, 'campaignId': session.id, 'name': original_character.name},
            )

                # prepare fresh character data from the base template
            char_data = {
                "user": original_character.user,
                "name": original_character.name,
                "race": original_character.race,
                "cla": original_character.cla,
                "subclass": original_character.subclass,
                "str": original_character.str,
                "dex": original_character.dex,
                "con": original_character.con,
                "int": original_character.int,
                "wis": original_character.wis,
                "cha": original_character.cha,
                "backstory": original_character.backstory,
                    "campaignId": session.id,  # link to this specific campaign session
                    "current_turn": 0  # always start at turn 0
            }

            if change_character:
                    # update existing sheet (resets stats to base values)
                await self.db.usercharchange.update(
                    where={'id': change_character.id},
                    data=char_data
                )
                print(f"reset stats in usercharchange for {username}, character {original_character.name} in campaign {seed}.")
            else:
                    # create new campaign-specific character sheet
                await self.db.usercharchange.create(data=char_data)
                print(f"created new entry in usercharchange for {username}, character {original_character.name} for campaign {seed}.")
            
                return True, "character sheet for campaign created/reset successfully."

        except Exception as e:
            error_msg = str(e)
            print(f"failed to reset character data for user {username}: {error_msg}")
            return False, f"database error: {error_msg}"
        
class get_from_db:

    def __init__(self):
        tracemalloc.start()
        self.db = Prisma()
        

    async def connect(self):
        await self.db.connect()


    def create_embedding(self, model : str, input):
        self.model = st(model, device="cuda")
        self.embeddings = self.model.encode(input)

        return self.embeddings
    
    def get_similarities(self, embedding1, embedding2):
        sims = self.model.similarity(embedding1, embedding2)

        return sims
    
    async def db_get(self, model: str, words : list, seed : int | None):

        embedding = self.create_embedding(model, words)


        tables = ["SPELLSVECTOR","ITEMSVECTOR","CHARACTERVECTOR","SESSION", "MONSTERVECTOR"]


        results = []
        similarities = []

        for i in range(1, len(tables)):

            tuple_list = []

            if tables[i] == 'SESSION':

                if seed is None:
                    continue

                entry = await self.db.query_raw(f'SELECT id, text FROM "{tables[i]}" WHERE "sessionID" = $2 ORDER BY embedding <-> $1::vector LIMIT 3;', embedding.tolist(), seed)

                for ent in entry:

                    

                    tuple = (ent, self.get_similarities(self.create_embedding(model, str(ent)), embedding))
                    
                    tuple_list.append(tuple)


            else:
        
                entry = await self.db.query_raw(f'SELECT id, text FROM "{tables[i]}" ORDER BY embedding <-> $1::vector LIMIT 3;', embedding.tolist())

                for ent in entry:

                    tuple = (ent, self.get_similarities(self.create_embedding(model, str(ent)), embedding))
                    
                    tuple_list.append(tuple)

            new_tuple = (tables[i], tuple_list)

            results.append(new_tuple)

        return results
    
    async def best_result(self, initial_confidence : float, model: str, words : str, seed : int | None):
        r'''
            params:
            Initial_confidence: This is the base confidence level for returned items,
            Model: This is the model used for creating any and all embeddings,
            Words: This is the initial phrase to search with,
            Seed: Is technically optional so if you don't need it, set it to None,

            returns:
            A list of tuples in the form:
            (name, best entry, confidence of best entry)
        '''

        results = await self.db_get(model, words, seed)

        final_list = []

        for result in results:
            name, entries = result
            start = initial_confidence
            final_result = ""
            for entry in entries:
                ent, conf = entry
                if conf.item() > start:
                    final_result = ent
                    start = conf.item()

            final_list.append((name, final_result, start))

        return final_list
    
    async def for_training(self, input):
        torch.cuda.empty_cache()

        results = await self.best_result(0.0, 'all-MiniLM-L6-v2', input, None)

        initial = 0.0

        for item in results:

            name, entry, confidence = item

            if confidence > initial:

                initial = confidence

                extra_info = f"{name.replace("VECTOR", "")}, {entry},"

        return extra_info
        

    
    
    async def add_session(self, model : str, input : str, seed : int):

        embedding = self.create_embedding(model, input)


        await self.db.execute_raw(
                f'INSERT INTO \"SESSION\" ("sessionID", text, embedding) VALUES ($1, $2, $3)',
                seed,
                input,
                embedding.tolist()
            )
        
        print("Session Successfully updated!")

    async def get_session_id(self):

        #SELECT MAX(column_name) FROM table_name;

        session_number = await self.db.query_raw(
            'select max("sessionID") from "SESSION"'
        )

        print("Seed from db: ", session_number)

        return session_number[0]['max']
    
    async def update_character_stats(self, username: str, stats_dict: dict, seed: int):
        """
        Update the stats for the user's active character in the specified campaign (seed).
        We look up the campaign session by compound unique (seed, user) and then
        update the USERCHARCHANGE row for that session and the user's last-created character.
        """
        if not username or not stats_dict:
            print("Update failed: Username or stats dictionary not provided.")
            return False, "Username or stats dictionary not provided."

        try:
            # Determine the user's last created character name
            base_char = await self.db.userchar.find_first(
                where={'user': username},
                order={'id': 'desc'}
            )
            if not base_char:
                return False, f"No base character found for user {username}."

            # Locate the session for this (seed,user)
            session = await self.db.campaignsession.find_unique(
                where={'seed_user': {'seed': str(seed), 'user': username}}
            )
            if not session:
                return False, f"No campaign session found for user {username} and seed {seed}."

            # Find the per-campaign character sheet
            character_to_update = await self.db.usercharchange.find_first(
                where={'user': username, 'campaignId': session.id, 'name': base_char.name},
                order={'id': 'desc'}
            )
            if not character_to_update:
                return False, f"No campaign character found for user {username} in seed {seed}."

            update_data = {
                'str': stats_dict.get('Might'),
                'dex': stats_dict.get('Agility'),
                'con': stats_dict.get('Spirit'),
                'int': stats_dict.get('Intellect'),
                'wis': stats_dict.get('Wisdom'),
                'cha': stats_dict.get('Presence')
            }

            await self.db.usercharchange.update(
                where={'id': character_to_update.id},
                data=update_data
            )
            print(f"Updated campaign stats for {base_char.name} (user: {username}) in seed {seed}")
            return True, "Character stats updated successfully."

        except Exception as e:
            error_msg = str(e)
            print(f"Failed to update character stats for user {username}: {error_msg}")
            return False, f"Database error: {error_msg}"

    async def get_character(self, username, seed: int, change : bool):
        try:
            table_name = "USERCHARCHANGE" if change else "USERCHAR"
            
            character = await self.db.userchar.find_first(
                where={'user': username},
                order={'id': 'desc'}
            )
            if not character:
                return None
            char_name = character.name

            if change:
                session = await self.db.campaignsession.find_unique(
                    where={'seed_user': {'seed': str(seed), 'user': username}}
                )
                if not session:
                    print(f"No campaign session found for user {username}, character {char_name} and seed {seed}")
                    # Fallback to searching without session, though this might be incorrect
                    character_data = await self.db.query_raw('' \
                        f'SELECT * FROM "{table_name}" WHERE "user" = $1 AND "name" = $2 ORDER BY "id" DESC LIMIT 1',
                        username, char_name)
                else:
                    character_data = await self.db.query_raw('' \
                        f'SELECT * FROM "{table_name}" WHERE "user" = $1 AND "name" = $2 AND "campaignId" = $3 ORDER BY "id" DESC LIMIT 1',
                        username, char_name, session.id)
            else:
                character_data = await self.db.query_raw('' \
                    f'SELECT * FROM "{table_name}" WHERE "user" = $1 AND "name" = $2 ORDER BY "id" DESC LIMIT 1',
                    username, char_name)

            if not character_data:
                 # Fallback to base character if no campaign-specific one is found
                 character_data = await self.db.query_raw('' \
                    f'SELECT * FROM "USERCHAR" WHERE "user" = $1 AND "name" = $2 ORDER BY "id" DESC LIMIT 1',
                    username, char_name)

            print("Character data from db: ", character_data[0], "\n Using table: ", table_name)

            return character_data[0]
        except Exception as e:
            print(f"Error fetching character for user {username} named {char_name}: {e}")
            return None
    
    async def get_character_attributes(self, username: str, seed: int | None, change : bool) -> dict | None:
        """
        Retrieves attributes for a user's character.
        If change is True, it gets the modified stats for a specific campaign.
        If change is False, it gets the base stats from the original character.
        Always uses the LAST CREATED character (highest id) for the user.
        
        NOTE: This function should NOT create USERCHARCHANGE rows. That's done by reset_usercharchange_table.
        """
        try:
            base_char = await self.db.userchar.find_first(
                where={'user': username},
                order={'id': 'desc'}
            )
            if not base_char:
                print(f"Base character not found for user {username}")
                return None
            char_name = base_char.name
            print(f"Using character: {char_name} (id: {base_char.id}) for user {username}")

            if not change:
                # Get base character, not tied to a campaign
                character = base_char
                print("Fetching base character from USERCHAR.")
            else:
                # Get campaign-specific character
                if not seed:
                    print("Error: Seed is required to fetch campaign-specific character data.")
                    return None

                session = await self.db.campaignsession.find_unique(
                    where={'seed_user': {'seed': str(seed), 'user': username}}
                )
                if not session:
                    print(f"ERROR: No campaign session found for user {username} and seed {seed}. Please call /seed first.")
                    return None
                
                # Look for existing USERCHARCHANGE row for this campaign
                character = await self.db.usercharchange.find_first(
                    where={'user': username, 'campaignId': session.id, 'name': char_name},
                    order={'id': 'desc'}
                )
                
                print(f"Fetching campaign character from USERCHARCHANGE for campaign {seed}.")

                if character is None:
                    print(f"ERROR: No USERCHARCHANGE found for campaign {seed}. The /seed endpoint should have created this.")
                    print(f"Falling back to base character stats as emergency measure.")
                    character = base_char
            
            if character:
                attributes = {
                    'Might': character.str,
                    'Agility': character.dex,
                    'Presence': character.cha,
                    'Intellect': character.int,
                    'Wisdom': character.wis,
                    'Spirit': character.con,
                    'hp': 20 
                }
                print(f"Successfully obtained character attributes for {username}'s character {char_name}.")
                return attributes
            else:
                print(f"No character found for user {username} with name {char_name}.")
                return None

        except Exception as e:
            print(f"Error fetching character attributes for user {username}: {e}")
            return None

    async def get_all_characters_for_user(self, username: str):
        """
        Retrieves all character names for a given user.
        """
        try:
            characters = await self.db.userchar.find_many(
                where={'user': username},
                select={'name': True}
            )
            return [char.name for char in characters]
        except Exception as e:
            print(f"Error fetching characters for user {username}: {e}")
            return []
