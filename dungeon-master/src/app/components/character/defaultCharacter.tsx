'use client'
import Character from './characterType';

export const DEFAULT_CHARACTER: Character = {
    name: "Default Hero",
    race: "Human",
    class: "Rogue",
    subclass: "Thief",
    stats: {
        STRENGTH: 14,
        DEXTERITY: 12,
        CONSTITUTION: 13,
        INTELLIGENCE: 10,
        WISDOM: 11,
        CHARISMA: 15,
    },
    skills: {
        "Acrobatics (Dex)": false,
        "Animal Handling (Wis)": false,
        "Arcana (Int)": false,
        "Athletics (Str)": true,
        "Deception (Cha)": true, 
        "History (Int)": false, 
        "Insight (Wis)": true, 
        "Investigation (Int)": false, 
        "Medicine (Wis)": false, 
        "Nature (Int)": false, 
        "Performance (Cha)": false, 
        "Persuasion (Cha)": false, 
        "Religion (Int)": false, 
        "Sleight of Hand (Dex)": true, 
        "Stealth (Dex)": true, 
        "Survival (Wis)": false,
        "Perception (Wis)": true,
        "Intimidation (Cha)": false,
    },
    backstory: "He was a super cool hero or something"
};
