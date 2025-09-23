import prisma
import tracemalloc


#May need to identify which schema to pull from, and then the details of the object in said schema
#Takes in Name to return the object which should be dict-like
#Should return a dict-like or list of dict object

async def get_data(name):
    tracemalloc.start()
    db = prisma()
    await db.connect()

    data = await db.user.find_unique_or_raise(where={
        'name':name,
    })

    return data


get_data("Zombie")
