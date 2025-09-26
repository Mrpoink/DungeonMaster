import tracemalloc
import asyncio
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'prisma', 'generated'))

from prisma import Prisma



# Add the parent directory to the Python path to find the generated client

async def get_data(name):
    tracemalloc.start()
    db = Prisma()
    await db.connect()

    print("DB Connected")
    
    await db.disconnect()


if __name__ == '__main__':
    asyncio.run(get_data("Zombie"))
