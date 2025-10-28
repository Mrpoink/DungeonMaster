'use client'
import { BottomNav } from "@/app/components/nav/nav";
import { useState } from "react";
import Character from "@/app/components/character/characterType";
import { DEFAULT_CHARACTER } from "@/app/components/character/defaultCharacter";


export default function CharacterInfo() {
  const [characterData, setCharacterData] = useState<Character>(DEFAULT_CHARACTER);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null); // Clear previous errors

    if (file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = e.target?.result as string;
                const data: Character = JSON.parse(json);
                if (data.name && data.stats && data.skills) {
                    setCharacterData(data);
                    console.log("Character sheet loaded successfully:", data.name);
                } else {
                    throw new Error("Missing required fields in JSON.");
                }
            } catch (error) {
                const errMsg = "Error parsing JSON file. Please ensure it is correctly formatted.";
                setUploadError(errMsg);
                console.error(error);
            }
        };
        reader.onerror = () => {
            setUploadError("Failed to read the file.");
        };
        reader.readAsText(file);
    } else {
        setUploadError("Unsupported file type. Please upload a .json character sheet.");
    }
    // Reset file input value to allow re-uploading the same file
    event.target.value = '';
  };

  return (
    <div className="character-sheet">
        <header>
          <div className="character-sheet-upload-div">
            <input
                id="character-sheet-upload"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
            />
            <p className="text-xs text-gray-500">
                (JSON only)
            </p>
          </div>
        </header>
        {uploadError && (
          <div className="bg-red-900 border border-red-400 text-red-100 p-3 rounded-md mb-4">
              <p className="font-bold">Upload Error:</p>
              <p className="text-sm">{uploadError}</p>
          </div>
        )}
        <div className="character-info">
            <h1>{characterData.name}</h1>
            <div className="sub-info">
               <div>
                  <h2>Race:</h2>
                  <p>{characterData.race}</p>
               </div>
               <div>
                  <h2>Class:</h2>
                  <p>{characterData.class}</p>
                  <h3>Subclass:</h3>
                  <p>{characterData.subclass}</p>
                </div>
            </div>
            <div className="key-stats">
              <h2>Key Stats</h2>
              {Object.entries(characterData.stats).map(([statName, statValue]) => (
                    <div key={statName} className="stat-item flex justify-between">
                        <span className="text-gray-400">{statName}:</span>
                        <span className="font-bold text-xl text-green-400">{statValue}</span>
                    </div>
                ))}
            </div>
            <div className="skills">
              <h2>Skills</h2>
              {Object.entries(characterData.skills).map(([skillName, isProficient]) => (
                    <div key={skillName} className={`flex items-center space-x-2 ${isProficient ? 'font-semibold text-green-400' : 'text-gray-400'}`}>
                        <span className="w-2 h-2 rounded-full border border-current" style={{ backgroundColor: isProficient ? '#10B981' : 'transparent' }}></span>
                        <span>{skillName}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="bottom-nav-buttons">
          <button onClick={() => console.log('Saving character data:', characterData)}>
            Save Character
          </button>
          <BottomNav />
        </div>
    </div>
  )
}