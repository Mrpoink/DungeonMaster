import json
import pgvector
import tracemalloc
import sys
import os
import numpy as np

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
        for key, value in data.items():
            if value is type(dict):
                for value_key, value_value in value.items():
                    new_string = f"{value_key} : {value_value}"
                self.data_list.append(f"{key} : {new_string}.")
                
            else:
                self.data_list.append(f"{key} : {value}.")    

    def make_embedding(self, model : str):
        model = st(model)
        data = self.data_list
        self.embeddings = model.encode(data)
        print(type(self.embeddings))
        print(len(self.embeddings))

    def create_query(self):
        self.query_tuple_list = []
        for i in range(len(self.data_list)):
            tuple = (str(self.data_list[i]), self.embeddings[i].tolist())
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
        
        print(self.query_tuple_list)

        print("Successfully updated!")

        await self.db.disconnect()
        
class get_from_db:

    def __init__(self):
        tracemalloc.start()
        self.db = Prisma()
        

    async def connect(self):
        await self.db.connect()


    def create_embedding(self, model : str, input : str):
        model = st(model)
        self.embeddings = model.encode(input)
        print(type(self.embeddings))
        print(len(self.embeddings))
        print(self.embeddings)

        return self.embeddings
    
    async def db_get(self, model: str, tablename : str, words : list):

        embedding = self.create_embedding(model, words)
        
        embedding = np.mean(embedding, axis=0).tolist()

        similarity = await self.db.query_raw(f'SELECT id, text FROM "{tablename}" ORDER BY embedding <-> $1::vector LIMIT 1;', embedding)

        return similarity


