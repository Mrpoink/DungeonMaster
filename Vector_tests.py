from vector_database import get_from_db
from sentence_transformers import SentenceTransformer as st
import asyncio


model = 'all-MiniLM-L6-v2'

vb = get_from_db()

embeddings = []
sentence_list = ["This is a Zombie", "This is not a Zombie"]


st_model = st(model)

here = st_model.encode(sentence_list)

# print(here.tolist())

embedding = vb.create_embedding(model, sentence_list)

similarities = vb.get_similarities(embedding, embedding)

# print(similarities.tolist())
# print(len(similarities))

async def get():
    
    await vb.connect()

    results = await vb.best_result(0.0, 'all-MiniLM-L6-v2', "I attack the zombie with my shortsword", 12345)

    for result in results:
        name, entry, confidence = result
        print(f"{name}:\n{entry}\n{confidence}\n---------------")



asyncio.run(get())
