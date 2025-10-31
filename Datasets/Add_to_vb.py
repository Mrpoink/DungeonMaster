from PdfReader import read_pdf
from vector_database import use_vector_db
import asyncio

async def add_pdf_to_vb(filename, model):

    try:
        text, max, short = read_pdf(filename)
        print(f"Info about pdf:\nLength: {len(text)}\nShortest: {short}\nLongest: {max}\n")
    except Exception as e:
        print(f"Could not parse pdf: {e}")

    vb = use_vector_db()

    await vb.connect()

    await vb.add_to_db("STORYVECTOR", text, model)

    print("Successfully added everything to db")

asyncio.run(add_pdf_to_vb('Datasets\\Campaigns\\armyofthedamned.pdf', 'all-MiniLM-L6-v2'))