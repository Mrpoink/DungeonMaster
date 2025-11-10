'use client'
import Character from './characterType';

export const DEFAULT_CHARACTER: Character = {
    name: "Default Hero",
    race: "Human",
    class: "Rogue",
    subclass: "Thief",
    stats: {
        MIGHT: 14,
        AGILITY: 12,
        SPIRIT: 13,
        INTELLECT: 10,
        WISDOM: 11,
        PRESENCE: 15,
    },
    skills: {
        "Arcana": false,
        "Investigation": false, 
        "Engineering": false, 

        "Athletics": false,
        "Brawling": false,
        "Endurance": false,

        "Stealth": false, 
        "Acrobatics": false,
        "Sleight of Hand": false, 

        "Persuasion": false, 
        "Deception": false, 
        "Performance": false, 

        "Insight": false, 
        "Survival": false,
        "Medicine": false, 

        "Faith": false, 
        "Willpower": false, 
        "Attunement": false, 

    },
    backstory: "He was a super cool hero or something"
};
