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
        
    async def add_user_character(self, username, name, race, char_class, subclass, strength, dexterity, constitution, intelligence, wisdom, charisma, backstory):
        try:
            # The raw SQL query to insert a new character.
            # Note that column names are enclosed in double quotes to preserve casing.
            await self.db.execute_raw(
                'INSERT INTO "USERCHAR" ("user", "name", "race", "cla", "subclass", "str", "dex", "con", "int", "wis", "cha", "backstory") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
                username,
                name,
                race,
                char_class,
                subclass or "",
                int(float(strength)),
                int(float(dexterity)),
                int(float(constitution)),
                int(float(intelligence)),
                int(float(wisdom)),
                int(float(charisma)),
                backstory or ""
            )
            
            print(f"Successfully created character {name} for user {username}")
            return True, "Character successfully created"

        except ValueError as e:
            print(f"Invalid data format: {e}")
            return False, "Invalid stat values. Please ensure all stats are numbers."
        except RawQueryError as e:
            error_msg = str(e)
            print(f"Failed to add user character data: {error_msg}")
            # Check for specific database constraint violations in the error message
            if 'violates foreign key constraint' in error_msg:
                return False, f"User {username} does not exist. Please create an account first."
            elif 'violates unique constraint' in error_msg:
                # This assumes there's a unique constraint on the character name per user
                return False, f"A character named {name} already exists for this user. Please choose a different name."
            else:
                return False, f"Database error: {error_msg}"
        except Exception as e:
            # Catch any other unexpected errors
            error_msg = str(e)
            print(f"An unexpected error occurred: {error_msg}")
            return False, f"An unexpected error occurred: {error_msg}"
        
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
    
    async def update_character_stats(self, username: str, stats_dict: dict):
        """
        Updates the stats for a user's character in the database.
        """
        if not username or not stats_dict:
            print("Update failed: Username or stats dictionary not provided.")
            return False, "Username or stats dictionary not provided."

        try:
            # Find the specific character to update.
            # This assumes a user might have multiple characters, but we'll update the first one found.
            # For a more robust system, a character ID would be better.
            character_to_update = await self.db.userchar.find_first(
                where={'user': username}
            )

            if not character_to_update:
                return False, f"No character found for user {username}."
            
            print(f"int check : {stats_dict.get('Intelligence')}")

            # Prepare the data for the update operation
            update_data = {
                'str': stats_dict.get('Might'),
                'dex': stats_dict.get('Agility'),
                'con': stats_dict.get('Spirit'),
                'int': stats_dict.get('Intelligence'),
                'wis': stats_dict.get('Wisdom'),
                'cha': stats_dict.get('Presence')
            }

            await self.db.userchar.update(
                where={'id': character_to_update.id},
                data=update_data
            )
            
            print(f"Successfully updated stats for character {character_to_update.name} (user: {username})")
            return True, "Character stats updated successfully."

        except Exception as e:
            error_msg = str(e)
            print(f"Failed to update character stats for user {username}: {error_msg}")
            return False, f"Database error: {error_msg}"

    async def get_characters_for_user(self, username: str):
        """
        Retrieves all characters for a given user and returns them as a list.
        """
        if not username:
            return []
        
        await self.db.connect()
        try:
            characters = await self.db.userchar.find_many(
                where={'user': username}
            )
            # The result from find_many is already a list of character objects (dictionaries)
            return characters[-1]
        except Exception as e:
            print(f"Error fetching characters for user {username}: {e}")
            return []
        finally:
            if self.db.is_connected():
                await self.db.disconnect()

    async def get_character(self, username):
        try:
            character_data = await self.db.query_raw('' \
            'SELECT T2.* FROM "USERDATA" AS T1 ' \
            'INNER JOIN "USERCHAR" AS T2 ON T1."username" = T2."user"' \
            'WHERE T1."username" = $1',
            username)

            print("Character data from db: ", character_data)

            return character_data[-1]
        except Exception as e:
            print(f"Error fetching character for user {username}: {e}")
            return None
    
    async def get_character_attributes(self, username: str) -> dict | None:
        """
        Retrieves attributes for a user's character and returns them as a dictionary.
        """
        if not username:
            return None

        try:
            character = await self.db.userchar.find_first(
                where={'user': username},
                order={'id': 'desc'} # Get the first character created if there are multiple
            )

            if character:
                # Map database fields to the player class attribute names
                attributes = {
                    'Might': character.str,
                    'Agility': character.dex,
                    'Presence': character.cha,
                    'Intelligence': character.int,
                    'Wisdom': character.wis,
                    'Spirit': character.con,
                    'hp': 20 # Default HP, can be loaded from db if added to schema
                }
                return attributes
            else:
                print(f"No character found for user {username}.")
                return None

        except Exception as e:
            print(f"Error fetching character attributes for user {username}: {e}")
            return None

