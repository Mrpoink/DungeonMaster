'use client'
import {useState, useEffect} from "react";

type RollProps = {
    sides: number;
    onRollClick: (rollResult: number) => void;
    disabled?: boolean;
    resetTrigger?: number;
}

export default function Roll({ sides, onRollClick, disabled, resetTrigger }: RollProps){
    const [rollResult, setRollResult] = useState<number | null>(null);

    // Clear roll result when resetTrigger changes
    useEffect(() => {
        setRollResult(null);
    }, [resetTrigger]);

    const handleRoll = () => {
        const roll = Math.floor(Math.random() * sides) + 1;
        setRollResult(roll);
        onRollClick(roll);
    }

    return(
        <div className="roll-container">
            <button 
                id="roll-dice-button" 
                onClick={handleRoll}
                disabled={disabled}
            >
                ROLL
            </button>
            {rollResult !== null && (
                <div className="roll-result">
                    You rolled: {rollResult}
                </div>
            )}
        </div>
    )
}