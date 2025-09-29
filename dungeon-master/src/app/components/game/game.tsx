'use client'
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import Background from "../assets/mainBackground.png";
import D20 from "../assets/d20.png";
import D12 from "../assets/d12.png";
import D10 from "../assets/d10.png";
import D8 from "../assets/d8.png";
import D6 from "../assets/d6.png";
import D4 from "../assets/d4.png";


export default function Game() {
  const router = useRouter()
  const [dice, setDice] = useState("d20");
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
    return roll;
  }


  return (
    <div>
        <header>
            <h1>Dungeon Master:</h1>
            <div>
              <blockquote>
                You enter into combat.<br></br> Roll for initiative.
              </blockquote>
            </div>
        </header>
        <div className="dice">
          <img src={D20.src} alt="" onClick={() => setDice("d20")}/>
          <img src={D12.src} alt="" onClick={() => setDice("d12")}/>
          <img src={D10.src} alt="" onClick={() => setDice("d10")}/>
          <img src={D8.src} alt="" onClick={() => setDice("d8")}/>
          <img src={D6.src} alt="" onClick={() => setDice("d6")}/>
          <img src={D4.src} alt="" onClick={() => setDice("d4")}/>

        </div>
        <main className="game">
          <img src={Background.src} alt="" />
          <div className="player-actions">
            <input type="text" placeholder="What do you do?" disabled/>
            <button onClick={handleRoll}>
              ROLL
            </button>
          </div>
        </main>
    </div>
  )
}