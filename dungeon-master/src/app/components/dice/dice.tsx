'use client'
import { useState } from "react";
import D20 from "@/app/components/assets/dice/d20.png";
import D12 from "@/app/components/assets/dice/d12.png";
import D10 from "@/app/components/assets/dice/d10.png";
import D8 from "@/app/components/assets/dice/d8.png";
import D6 from "@/app/components/assets/dice/d6.png";
import D4 from "@/app/components/assets/dice/d4.png";

export default function Dice() {
  const [dice, setDice] = useState("d20");
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  
  const handleActive = ()=>{
    setIsActive(!isActive);
  }
  const handleRoll = () => {
    let sides = 20;
    switch (dice) {
      case "d20":
        sides = 20;
        break;
      case "d12":
        sides = 12;
        break;
      case "d10":
        sides = 10;
        break;
      case "d8":
        sides = 8;
        break;
      case "d6":
        sides = 6;
        break;
      case "d4":
        sides = 4;
        break;
      default:
        sides = 20;
    }
    const roll = Math.floor(Math.random() * sides) + 1;
    setRollResult(roll);
  }

  return (
    <div>
        <div className="dice">
          <img id="d20" src={D20.src} title="D20" alt="" onClick={() => setDice("d20")} className={isActive ? 'active-dice' : 'default-dice'}/>
          <img id="d12" src={D12.src} alt="" onClick={() => setDice("d12")} className={isActive ? 'active-dice' : 'default-dice'}/>
          <img id="d10" src={D10.src} alt="" onClick={() => setDice("d10")} className={isActive ? 'activeDice' : 'default-dice'}/>
          <img id="d8" src={D8.src} alt="" onClick={() => setDice("d8")} className={isActive ? 'active-dice' : 'default-dice'}/>
          <img id="d6" src={D6.src} alt="" onClick={() => setDice("d6")} className={isActive ? 'active-dice' : 'default-dice'}/>
          <img id="d4" src={D4.src} alt="" onClick={() => setDice("d4")} className={isActive ? 'active-dice' : 'default-dice'}/>

        </div>
    </div>
  )
}