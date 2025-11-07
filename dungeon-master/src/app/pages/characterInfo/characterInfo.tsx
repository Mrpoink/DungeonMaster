'use client'

import { BottomNav } from "@/app/components/nav/nav";
import { useState } from "react";
import Character from "@/app/components/character/characterType";
import { DEFAULT_CHARACTER } from "@/app/components/character/defaultCharacter";
import { BiHeart, BiPencil, BiShield } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuScrollText } from "react-icons/lu";
import { BsLightning } from "react-icons/bs";
import { GiSwordBreak } from "react-icons/gi";
import { MdBook } from 'react-icons/md';




// --- HELPER COMPONENTS ---
const EditInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        className="edit-input"
        {...props}
    />
);

const AbilityScore = ({ name, score }: { name: string, score: number }) => {
    const modifier = Math.floor((score - 10) / 2);
    const modString = modifier >= 0 ? `+${modifier}` : modifier.toString();

    return (
        <div className="ability-score-display">
            <span className="ability-label">{name.substring(0, 3)}</span>
            <div className="relative mt-1">
                <span className="ability-score">{score}</span>
                <span className="ability-mod">
                    {modString}
                </span>
            </div>
        </div>
    );
};


 // --- MAIN COMPONENT ---
 export default function CharacterInfo() {
     const [characterData, setCharacterData] = useState(DEFAULT_CHARACTER);
     const [uploadError, setUploadError] = useState<string | null>(null);

    // --- EDITING STATES ---
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingBasic, setIsEditingBasic] = useState(false);
    const [isEditingStats, setIsEditingStats] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [isEditingBackstory, setIsEditingBackstory] = useState(false);

    // Temporary form states
    const [tempName, setTempName] = useState(characterData.name);
    const [tempRace, setTempRace] = useState(characterData.race);
    const [tempClass, setTempClass] = useState(characterData.class);
    const [tempSubclass, setTempSubclass] = useState(characterData.subclass);
    const [tempStats, setTempStats] = useState(characterData.stats);
    const [tempSkills, setTempSkills] = useState(characterData.skills);
    const [tempBackstory, setTempBackstory] = useState(characterData.backstory);


    // --- SAVE HANDLERS ---
    const handleSaveName = () => {
        setCharacterData(prev => ({ ...prev, name: tempName }));
        setIsEditingName(false);
    };

    const handleSaveBasic = () => {
        setCharacterData(prev => ({ ...prev, race: tempRace }));
        setCharacterData(prev => ({ ...prev, class: tempClass }));
        setCharacterData(prev => ({ ...prev, subclass: tempSubclass }));
        setIsEditingBasic(false);
    }

    const handleSaveStats = () => {
        const savedStats = Object.fromEntries(
            Object.entries(tempStats).map(([key, value]) => [key, parseInt(value as any) || 0])
        ) as Character['stats'];
        setCharacterData(prev => ({ ...prev, stats: savedStats }));
        setIsEditingStats(false);
    };

    const handleSaveSkills = () => {
        setCharacterData(prev => ({ ...prev, skills: tempSkills }));
        setIsEditingSkills(false);
    };
    
    const handleSaveBackstory = () => {
        setCharacterData(prev => ({ ...prev, backstory: tempBackstory }));
        setIsEditingBackstory(false);
    };


    // --- RENDER FUNCTIONS ---
    const renderHeader = () => {
        if (isEditingName) {
            return (
                <div className="space-y-4">
                    <div className="heading-with-edit border-none pb-0 mb-4">
                        <h2 className="text-2xl font-bold text-white">Change Name</h2>
                        <div className="edit-controls">
                            <button onClick={handleSaveName} className="edit-save-btn"><FaCheck className="w-5 h-5" /></button>
                            <button onClick={() => setIsEditingName(false)} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Character Name</label>
                        <EditInput value={tempName} onChange={(e) => setTempName(e.target.value)} />
                    </div>
                </div>
            );
        }
        
        return (
            <div className="relative">
                <div className="name-heading">
                    <h1 className="char-name">{characterData.name}</h1>
                    <button 
                        onClick={() => { setIsEditingName(true);}}
                        className="edit-button"
                        title="Edit Name"
                    >
                        <BiPencil className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    };

    const renderBasic = () => {
        if (isEditingBasic) {
            return (
                <div className="content-block">
                    <div className="heading-with-edit">
                        <h3 className="heading-text">Edit Basic Information</h3>
                        <div className="edit-controls">
                            <button onClick={handleSaveBasic} className="edit-save-btn"><FaCheck className="w-5 h-5" /></button>
                            <button onClick={() => setIsEditingBasic(false)} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Character Race</label>
                        <EditInput value={tempRace} onChange={(e) => setTempRace(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Character Class</label>
                        <EditInput value={tempClass} onChange={(e) => setTempClass(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Character Subclass</label>
                        <EditInput value={tempSubclass} onChange={(e) => setTempSubclass(e.target.value)} />
                    </div>
                </div>
            );
        }

        return (
            <div className="content-block relative">
                <div className="heading-with-edit border-b border-gray-700 pb-2">
                    <h3 className="heading-text">BASIC INFO</h3>
                    <button 
                        onClick={() => { setIsEditingBasic(true);}}
                        className="edit-button"
                        title="Edit Basic Information"
                    >
                        <BiPencil className="w-4 h-4" />
                    </button>
                </div>
                <div className="ability-scores-grid">
                    <p className="basicInfo-text">
                        {characterData.race}
                    </p>
                    <p className="basicInfo-text">
                        {characterData.class}
                    </p>
                    <p className="basicInfo-text">
                        {characterData.subclass}
                    </p>
                </div>
            </div>
        );
    };

    
    const renderStats = () => {
        if (isEditingStats) {
            return (
                <div className="content-block">
                    <div className="heading-with-edit">
                        <h3 className="heading-text">Edit Ability Scores</h3>
                        <div className="edit-controls">
                            <button onClick={handleSaveStats} className="edit-save-btn"><FaCheck className="w-5 h-5" /></button>
                            <button onClick={() => setIsEditingStats(false)} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <div className="ability-scores-grid">
                        {Object.entries(tempStats).map(([name, score]) => {
                            const modifier = Math.floor((parseInt(score as any) || 0) - 10) / 2;
                            const modString = modifier >= 0 ? `+${modifier}` : modifier.toString();
                            
                            return (
                                <div key={name} className="flex flex-col items-start">
                                    <label className="text-sm uppercase font-medium text-gray-400 mb-1">{name} ({modString})</label>
                                    <EditInput
                                        type="number"
                                        min="1"
                                        max="30"
                                        value={score}
                                        onChange={(e) => {
                                          const { name, value } = e.target;
  
                                          // Convert the string value to a number using Number()
                                          const newValue = Number(value); 
  

                                          setTempStats(prev => ({ 
                                          ...prev, 
                                          [name]: newValue // newValue is now guaranteed to be a 'number'
                                          }));

                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <div className="content-block relative">
                <div className="heading-with-edit border-b border-gray-700 pb-2">
                    <h3 className="heading-text">ABILITY SCORES</h3>
                    <button 
                        onClick={() => {setTempStats(characterData.stats); setIsEditingStats(true);}}
                        className="edit-button"
                        title="Edit Stats"
                    >
                        <BiPencil className="w-4 h-4" />
                    </button>
                </div>
                <div className="ability-scores-grid">
                    {Object.entries(characterData.stats).map(([name, score]) => (
                        <AbilityScore key={name} name={name} score={score as number} />
                    ))}
                </div>
            </div>
        );
    };

    const renderSkills = () => {
        if (isEditingSkills) {
            return (
                <div className="content-block">
                    <div className="heading-with-edit">
                        <h3 className="heading-text">Edit Skills</h3>
                        <div className="edit-controls">
                            <button onClick={handleSaveSkills} className="edit-save-btn"><FaCheck className="w-5 h-5" /></button>
                            <button onClick={() => setIsEditingSkills(false)} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <div className="skills-grid">
                        {Object.entries(tempSkills).map(([skillName, isProficient]) => (
                            <div key={skillName} className="flex items-center space-x-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={isProficient} 
                                        onChange={(e) => setTempSkills(prev => ({ ...prev, [skillName]: e.target.checked }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                                </label>
                                <span className="text-sm text-gray-200">{skillName.split(' ')[0]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="content-block relative">
                <div className="heading-with-edit border-b border-gray-700 pb-2">
                    <h3 className="heading-text">
                        SKILLS
                    </h3>
                    <button 
                        onClick={() => {setTempSkills(characterData.skills); setIsEditingSkills(true);}}
                        className="edit-button"
                        title="Edit Skills"
                    >
                        <BiPencil className="w-4 h-4" />
                    </button>
                </div>
                <div className="skills-grid">
                    {Object.entries(characterData.skills).map(([skillName, isProficient]) => (
                        <div 
                            key={skillName} 
                            className={`skill-item ${isProficient ? 'skill-proficient' : 'skill-not-proficient'}`}
                        >
                            <div className="skill-indicator"></div>
                            <span>{skillName}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderBackstory = () => {
        if (isEditingBackstory) {
            return (
                <div className="content-block p-6">
                    <div className="heading-with-edit">
                        <h3 className="heading-text">
                            <MdBook className="w-5 h-5 mr-2" /> Edit Backstory
                        </h3>
                        <div className="edit-controls">
                            <button onClick={handleSaveBackstory} className="edit-save-btn"><FaCheck className="w-5 h-5" /></button>
                            <button onClick={() => setIsEditingBackstory(false)} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <textarea
                        value={tempBackstory}
                        onChange={(e) => setTempBackstory(e.target.value)}
                        className="edit-input backstory-textarea"
                    ></textarea>
                </div>
            );
        }

        return (
            <div className="content-block p-6 relative">
                <div className="heading-with-edit border-b border-gray-700 pb-2">
                    <h3 className="heading-text">
                        BACKSTORY
                    </h3>
                    <button 
                        onClick={() => {setTempBackstory(characterData.backstory); setIsEditingBackstory(true);}}
                        className="edit-button"
                        title="Edit Backstory"
                    >
                        <BiPencil className="w-4 h-4" />
                    </button>
                </div>
                <p className="backstory-text">
                    {characterData.backstory}
                </p>
            </div>
        );
    };
    
    return (
        <div className="root-container">

            <div className="char-sheet-container">
                
                <header className="sheet-header">
                    {renderHeader()}
                </header>
                <div className="main-grid">
                    <div className="lg:col-span-1 space-y-8">
                        {renderBasic()}
                    </div>
                    <div className="lg:col-span-1 space-y-8">
                        {renderStats()}
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        {renderSkills()}
                    </div>
                    <div className="lg:col-span-3 space-y-8">
                        {renderBackstory()}
                    </div>
                </div>

                <div className="action-button-container">
                    <button className="action-button" onClick={() => console.log('Saving character data:', characterData)}>
                        Save Character
                    </button>
                    <div>
                        <BottomNav/>
                    </div>
                </div>
            </div>
        </div>
    );
};
