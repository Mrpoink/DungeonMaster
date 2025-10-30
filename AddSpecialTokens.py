from transformers import AutoTokenizer, AddedToken

tokenizer = AutoTokenizer.from_pretrained("HuggingFaceTB/SmolLM2-360M-Instruct")
custom_tokens = [
    AddedToken("|user|:", special=False),
    AddedToken("|assistant|:", special=False),
    AddedToken("|end|", special=False),
    AddedToken("[/EXTRA]", special=False),
    AddedToken("[/PLAYER]", special=False),
    AddedToken("[/ACTION]", special=False),
    AddedToken("[/CHECK]", special=False),
    AddedToken("[/PASS/FAIL]", special=False),
    AddedToken("[/OUTCOME]", special=False),
    AddedToken("[/GENERATED CHECK]", special=False),
    AddedToken("[/GENERATED OUTCOME]", special=False),
    AddedToken("[NO_CHECK]", special=False),
    AddedToken("Strength", special=False),
    AddedToken("Dexterity", special=False),
    AddedToken("Constitution", special=False),
    AddedToken("Intelligence", special=False),
    AddedToken("Wisdom", special=False),
    AddedToken("Charisma", special=False),
    AddedToken("Sleight of Hand", special=False),
    AddedToken("Athletics", special=False),
    AddedToken("Arcana", special=False),
    AddedToken("Performance", special=False),
    AddedToken("Deception", special=False),
    AddedToken("Medicine", special=False),
    AddedToken("Religion", special=False),
    AddedToken("Divine Sense", special=False),
    AddedToken("Stealth", special=False),
    AddedToken("Animal Handling", special=False),
    AddedToken("History", special=False),
    AddedToken("Constitution", special=False),
    AddedToken("Insight", special=False),
    AddedToken("Roll for", special=False),
    AddedToken("N/A", special=False)
]

tokenizer.save_pretrained("SmolLM2/new_Smol_tokenizer")