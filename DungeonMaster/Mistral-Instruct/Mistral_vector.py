import sys
import os
import asyncio
import numpy as np
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(project_root)

from Datasets import vector_database

async def main():

    get = vector_database.get_from_db()

    await get.connect()

    userin = input("Enter prompt: ")

    userin_words = userin.split(" ")

    similarity = await get.db_get('all-MiniLM-L6-v2', "MONSTERVECTOR", userin_words)

    for item in similarity:
        print(f"{item}\n--------------\n")

asyncio.run(main())