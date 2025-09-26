import sys
import os
import asyncio
import numpy as np
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(project_root)

from Datasets import vector_database


async def main():

    add = vector_database.use_vector_db()

    await add.connect()

    await add.add_to_db("MONSTERVECTOR", '/home/mrpoink/github-repos/DungeonMaster/DungeonMaster/Datasets/DatasetJSONs/Races.json', 'all-MiniLM-L6-v2')

asyncio.run(main())