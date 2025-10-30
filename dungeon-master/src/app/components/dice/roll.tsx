'use client'
import {useState} from "react";

type RollProps = {
    sides: number;
    command: string; 
    onRollClick: (isRoll: boolean) => Promise<void>; 
}

export default function Roll({ sides, command, onRollClick }: RollProps){
    const [rollResult, setRollResult] = useState<number | null>(null);

    const handleRoll = async () => {
        const roll = Math.floor(Math.random() * sides) + 1;
        setRollResult(roll);

        await onRollClick(true);
    }

    return(
        <div>
            <button 
                id="roll-dice-button" 
                onClick={handleRoll}
                // disabled={!command.trim()} // Disable if no text command is present
            >
                ROLL
            </button>
            {rollResult !== null && (
                <div className="roll-result">
                    Result: {rollResult}
                </div>
            )}
        </div>
    )
}