'use client'
import { useState } from "react";
import D20 from "@/app/components/assets/dice/d20.png";
import D12 from "@/app/components/assets/dice/d12.png";
import D10 from "@/app/components/assets/dice/d10.png";
import D8 from "@/app/components/assets/dice/d8.png";
import D6 from "@/app/components/assets/dice/d6.png";
import D4 from "@/app/components/assets/dice/d4.png";

interface DiceProps {
  onDiceSelect: (sides: number) => void;
  activeDice: string | null;
  onSetActiveDice: (dice: string) => void;
}

export default function Dice({ onDiceSelect, activeDice, onSetActiveDice }: DiceProps) {
  const handleClick = (selectedDie: string) => {
    onSetActiveDice(selectedDie);
    const sides = getSides(selectedDie);
    onDiceSelect(sides);
  }

  const getSides = (die: string):number => {
    switch (die) {
      case "d20": return 20;
      case "d12": return 12;
      case "d10": return 10;
      case "d8": return 8;
      case "d6": return 6;
      case "d4": return 4;
      default: return 20;
    }
  }

  return (
    <div>
        <div className="dice">
          <img id="d20" src={D20.src} title="D20" alt="" onClick={() => handleClick("d20")} className={activeDice === 'd20' ? 'active-dice' : ''}/>
          <img id="d12" src={D12.src} title="D12" alt="" onClick={() => handleClick("d12")} className={activeDice === 'd12' ? 'active-dice' : ''}/>
          <img id="d10" src={D10.src} title="D10" alt="" onClick={() => handleClick("d10")} className={activeDice === 'd10' ? 'active-dice' : ''}/>
          <img id="d8" src={D8.src} title="D8" alt="" onClick={() => handleClick("d8")} className={activeDice === 'd8' ? 'active-dice' : ''}/>
          <img id="d6" src={D6.src} title="D6" alt="" onClick={() => handleClick("d6")} className={activeDice === 'd6' ? 'active-dice' : ''}/>
          <img id="d4" src={D4.src} title="D4" alt="" onClick={() => handleClick("d4")} className={activeDice === 'd4' ? 'active-dice' : ''}/>
        </div>
    </div>
  )
}

export function Roll({ sides }: { sides: number }){
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