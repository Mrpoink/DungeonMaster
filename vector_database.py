import json
import pgvector
import tracemalloc
import sys
import os
import numpy as np
import torch

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'prisma', 'generated'))

from prisma import Prisma
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
        model = st(model, device="cpu")
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
    
    
    async def add_json_to_db(self, databasename: str, json_file : str, model : str):

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

    async def add_to_db(self, databasename : str, list : list, model : str):

        self.data_list= list

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

        await self.db.execute_raw(
            f'INSERT INTO \"USERDATA\" (name, username, password) VALUES ($1, $2, $3)',
            name,
            username,
            password
        )

        print("Successfully added user data")

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

    

        
class get_from_db:

    def __init__(self):
        tracemalloc.start()
        self.db = Prisma()
        

    async def connect(self):
        await self.db.connect()


    def create_embedding(self, model : str, input):
        self.model = st(model, device="cpu")
        self.embeddings = self.model.encode(input)

        return self.embeddings
    
    def get_similarities(self, embedding1, embedding2):
        sims = self.model.similarity(embedding1, embedding2)

        return sims
    
    async def db_get(self, model: str, words : list, seed : int | None):

        embedding = self.create_embedding(model, words)


        tables = ["SPELLSVECTOR","ITEMSVECTOR","CHARACTERVECTOR","SESSION", "MONSTERVECTOR"]


        results = []

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
    
    async def find_scene(self, initial_confidence : float, model: str, words : str):
        embedding = self.create_embedding(model, words)

        results = []

        tuple_list = []
        entry = await self.db.query_raw(f'SELECT id, text FROM \"STORYVECTOR\" ORDER BY embedding <-> $1::vector LIMIT 3;', embedding.tolist())

        print(entry[0])
                

        return entry[0]['text'].strip()
    
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


