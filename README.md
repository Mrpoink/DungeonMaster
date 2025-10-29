# QuestWeaver

## Description
Tabletop role-playing thrives on the creativity and adaptability of a human Dungeon Master (DM), yet most current online platforms rely on scripted encounters, fixed branching narratives, or pre-written modules. While these systems are efficient, they cannot fully capture the improvisational flexibility and dynamic storytelling that make in-person sessions so engaging. Players who take unexpected actions often find themselves nudged back onto fixed paths, breaking immersion and limiting creativity. At the same time, many groups lack an experienced DM, and new players face steep preparation barriers.
 
The LLM Dungeon Master addresses these gaps by using a fine-tuned large language model as the DM, capable of improvising encounters, quests, and NPC dialogue that adapt in real time to player decisions. Built on a Mistral-Instruct-7B model with a vector database of monsters, spells, classes, races, and items, the system balances generative flexibility with rule grounding and safe outputs. A PostgreSQL backend and web-based frontend allow players to log in, manage characters, join sessions, and roll dice, while the LLM handles both structured gameplay such as dice-driven combat and improvisational roleplay. This design lowers the barrier to entry, reduces prep time, and opens new possibilities for playful, adaptive, and accessible role-playing experiences that go beyond what current online tools can offer.

### Credits
Dr. Adithya Kulkarni, Brandon Dean, Elijah Webb, Tierra Williams

**How to run the application:**

* You can either clone into this branch or the main one, whichever one you'd like
* Run "pip install -r requirements.txt"
* Run the SmolLM2Download.py file in the SMolLM2 folder
* Then follow these steps for compatibility and the Front End:
- You will need to make another folder that reflects the main branch
- cd to the front-end file location
- Run "npm run dev"
- Run the pythoncompatibilitylayerback.py file (I should probably change this file name)
- Interact with the webpage

