'use client'
import { SetStateAction, useState } from "react";
import D20 from "@/app/components/assets/dice/d20.png";
import D12 from "@/app/components/assets/dice/d12.png";
import D10 from "@/app/components/assets/dice/d10.png";
import D8 from "@/app/components/assets/dice/d8.png";
import D6 from "@/app/components/assets/dice/d6.png";
import D4 from "@/app/components/assets/dice/d4.png";

export default function Dice() {
  const [isActive, setIsActive] = useState<string | null>(null);
  
  const handleActive = (activeDice: SetStateAction<string | null>) =>{
    setIsActive(activeDice);
  }
  const handleDiceSelect = () => {
    let sides = isActive ?? '';
    switch (sides) {
      case "d20":
        return 20;
      case "d12":
        return 12;
      case "d10":
        return 10;
      case "d8":
        return 8;
      case "d6":
        return 6;
      case "d4":
        return 4;
      default:
        return 20;
    }
  }

  return (
    <div>
        <div className="dice">
          <img id="d20" src={D20.src} title="D20" alt="" onClick={() => handleActive("d20")} className={isActive === 'd20' ? 'active' : ''}/>
          <img id="d12" src={D12.src} title="D12" alt="" onClick={() => handleActive("d12")} className={isActive === 'd12' ? 'active' : ''}/>
          <img id="d10" src={D10.src} title="D10" alt="" onClick={() => handleActive("d10")} className={isActive === 'd10' ? 'active' : ''}/>
          <img id="d8" src={D8.src} title="D8" alt="" onClick={() => handleActive("d8")} className={isActive === 'd8' ? 'active' : ''}/>
          <img id="d6" src={D6.src} title="D6" alt="" onClick={() => handleActive("d6")} className={isActive === 'd6' ? 'active' : ''}/>
          <img id="d4" src={D4.src} title="D4" alt="" onClick={() => handleActive("d4")} className={isActive === 'd4' ? 'active' : ''}/>
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
        {/* <button id="roll-dice-button" onClick={() => handleRoll()}>
          ROLL
        </button> */}
        {rollResult !== null && (
          <div className="roll-result">
            Result: {rollResult}
          </div>
        )}
    </div>
  )

}