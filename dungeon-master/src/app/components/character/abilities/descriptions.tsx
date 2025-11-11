'use client'

import { useState } from "react"
import { IoInformationCircle, IoCloseCircle } from "react-icons/io5"

export const skill_map ={
    INTELLECT: ['Arcana', 'Investigation', 'Engineering'],
    MIGHT: ['Athletics', 'Brawling', 'Endurance'],
    AGILITY: ['Stealth', 'Acrobatics', 'Sleight of Hand'],
    PRESENCE: ['Persuasion', 'Deception', 'Performance'],
    WISDOM: ['Insight', 'Survival', 'Medicine'],
    SPIRIT: ['Faith', 'Willpower', 'Attunement']
}

const abilityDescriptions = {
    INTELLECT: 'Represents reasoning, memory, and knowledge. (Takes value between 0 to 30)',
    MIGHT: 'Physical power and endurance. (Takes value between 0 to 30)',
    AGILITY: 'Speed, reflexes, and precision. (Takes value between 0 to 30)',
    PRESENCE: 'Force of personality, charisma, and emotional influence. (Takes value between 0 to 30)',
    WISDOM: 'Perception, intuition, and understanding of life and nature. (Takes value between 0 to 30)',
    SPIRIT: 'Connection to mystical, divine, or inner energy. (Takes value between 0 to 30)'
}

const skillDescriptions = {
    Arcana: 'Knowledge of magic, runes, and ancient lore. (Activated at Intellect 10)',
    Investigation: 'Ability to uncover clues and solve mysteries. (Activated at Intellect 20)',
    Engineering: 'Understanding machines, constructs, or alchemical devices. (Activated at Intellect 25)',

    Athletics: 'Running, jumping, climbing, swimming. (Activated at Might 10)',
    Brawling: 'Unarmed combat and physical grappling. (Activated at Might 20)',
    Endurance: 'Resisting fatigue, poison, or extreme environments. (Activated at Might 25)',

    Stealth: 'Moving silently and remaining unseen. (Activated at Agility 10)',
    Acrobatics: 'Balancing, flipping, dodging traps or attacks. (Activated at Agility 20)',
    'Sleight of Hand': 'Pickpocketing or handling delicate tasks. (Activated at Agility 25)',

    Persuasion: 'Convincing others through logic or charm. (Activated at Presence 10)',
    Deception: 'Lying convincingly or masking intent. (Activated at Presence 20)',
    Performance: 'Entertaining or inspiring an audience. (Activated at Presence 25)',

    Insight: 'Reading emotions, motives, or intentions. (Activated at Wisdom 10)',
    Survival: 'Navigating wilderness, tracking, foraging. (Activated at Wisdom 20)',
    Medicine: 'Healing wounds and treating illness. (Activated at Wisdom 25)',
    
    Faith: 'Drawing on divine or cosmic power. (Activated at Spirit 10)',
    Willpower: 'Resisting fear, magic, or mental influence. (Activated at Spirit 20)',
    Attunement: 'Sensing magical energies or aligning with artifacts. (Activated at Spirit 25)',
}

export default function giveDescription(name:string){
    let description = abilityDescriptions[name as keyof typeof abilityDescriptions]
    if(!description){
        description = skillDescriptions[name as keyof typeof skillDescriptions]
    }

    const descriptionText = description || 'Description not found'

    return(
        <div>
            {descriptionText}
        </div>
    )
}

type PopupName = string | null;

export function InformationIcon({name}: {name:string}){
    const [popUpName, setPopupName] = useState<PopupName>(null)

    const handleOpenPopup = () => {
        setPopupName(name)

    }
    const handleClosePopup = () => {
        setPopupName(null)
    }
    const descriptionElement = popUpName === name ? giveDescription(name):null;

    return(
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <IoInformationCircle 
                className="w-4 h-4 hover:text-white transition cursor-help"
                onClick={handleOpenPopup}
                style={{cursor:'pointer'}}
            />

            {descriptionElement && (
                <div className="information-box">
                    <div className="information-content">
                        <IoCloseCircle 
                            onClick={handleClosePopup}
                            className="information-close"
                        />
                        
                        <h3>{name}</h3>
                        {descriptionElement}
                    </div>
                </div>
            )}
        </div>
    )
}