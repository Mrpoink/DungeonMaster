'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Character from './characterType';
import { DEFAULT_CHARACTER } from './defaultCharacter';

export default function CharacterCreation() {
    const router = useRouter();
    const [character, setCharacter] = useState<Character>({...DEFAULT_CHARACTER});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Get username from localStorage
        const username = localStorage.getItem('username');
        if (!username) {
            router.push('/login');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('stats.')) {
            const statName = name.split('.')[1];
            setCharacter(prev => ({
                ...prev,
                stats: {
                    ...prev.stats,
                    [statName]: parseInt(value) || 0
                }
            }));
        } else if (name.startsWith('skills.')) {
            const skillName = name.split('.')[1];
            setCharacter(prev => ({
                ...prev,
                skills: {
                    ...prev.skills,
                    [skillName]: (e.target as HTMLInputElement).checked
                }
            }));
        } else {
            setCharacter(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const username = localStorage.getItem('username');
            if (!username) throw new Error('No username found');

            const characterData = {
                username,
                ...character,
                Might: character.stats.MIGHT,
                Agility: character.stats.AGILITY,
                Spirit: character.stats.SPIRIT,
                Intellect: character.stats.INTELLECT,
                Wisdom: character.stats.WISDOM,
                Presence: character.stats.PRESENCE
            };

            const response = await fetch('http://localhost:1068/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(characterData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.details || result.error || 'Failed to save character');
            }

            if (result.status === 'success') {
                console.log(result.message); // Log success message
                // Redirect to lobby after successful character creation
                router.push('/pages/lobby');
            } else {
                throw new Error(result.message || 'Failed to save character');
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to save character';
            setError(message);
            console.error('Error saving character:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="character-creation-container">
            <h2>Create Your Character</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="character-form">
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div>
                        <label htmlFor="name">Character Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={character.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="race">Race:</label>
                        <select name="race" value={character.race} onChange={handleChange}>
                            <option value="Human">Human</option>
                            <option value="Elf">Elf</option>
                            <option value="Dwarf">Dwarf</option>
                            <option value="Half-Foot">Half-Foot</option>
                            {/* Add more races */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="class">Class:</label>
                        <select name="class" value={character.class} onChange={handleChange}>
                            <option value="Fighter">Fighter</option>
                            <option value="Wizard">Wizard</option>
                            <option value="Rogue">Rogue</option>
                            <option value="Cleric">Cleric</option>
                            {/* Add more classes */}
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Stats</h3>
                    {Object.entries(character.stats).map(([stat, value]) => (
                        <div key={stat}>
                            <label htmlFor={`stats.${stat}`}>{stat}:</label>
                            <input
                                type="number"
                                id={`stats.${stat}`}
                                name={`stats.${stat}`}
                                value={value}
                                onChange={handleChange}
                                min="1"
                                max="30"
                            />
                        </div>
                    ))}
                </div>

                <div className="form-section">
                    <h3>Backstory</h3>
                    <textarea
                        name="backstory"
                        value={character.backstory}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Character...' : 'Create Character'}
                </button>
            </form>
        </div>
    );
}