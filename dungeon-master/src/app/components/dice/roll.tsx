'use client'
import {useState} from "react";

export default function Roll({ sides }: { sides: number }){
  const [rollResult, setRollResult] = useState<number | null>(null);

  const handleRoll = () => {
    const roll = Math.floor(Math.random() * sides) + 1;
    setRollResult(roll);
  }
  return(
    <div>
        <button id="roll-dice-button" onClick={() => handleRoll()}>
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