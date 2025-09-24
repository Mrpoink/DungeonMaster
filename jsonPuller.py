import tracemalloc
import asyncio
import sys
import os
from dotenv import load_dotenv

load_dotenv()

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'prisma', 'generated'))

from prisma import Prisma


os.environ['PRISMA_SCHEMA_ENGINE_BINARY'] = '/home/mrpoink/github-repos/DungeonMaster/prisma/.prisma/schema-engine-cli'

# Add the parent directory to the Python path to find the generated client
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

async def get_data(name):
    tracemalloc.start()
    db = Prisma()
    await db.connect()

    data = await db.monster.find_unique_or_raise(where={'name': name,})
    
    await db.disconnect()
    return data


if __name__ == '__main__':
    asyncio.run(get_data("Zombie"))
