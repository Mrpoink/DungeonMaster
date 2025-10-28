'use client'
import Character from './characterType';

export const DEFAULT_CHARACTER: Character = {
    name: "Default Hero",
    race: "Human",
    class: "Rogue",
    subclass: "Thief",
    stats: {
        Strength: 10, Dexterity: 15, Constitution: 14,
        Intelligence: 8, Wisdom: 12, Charisma: 10
    },
    skills: {
        Acrobatics: true, "Animal Handling": false, Arcana: false, Athletics: false, 
        Deception: true, History: false, Insight: true, Intimidation: false, 
        Investigation: false, Medicine: false, Nature: false, Perception: true, 
        Performance: false, Persuasion: false, Religion: false, 
        "Sleight of Hand": true, Stealth: true, Survival: false
    }
};