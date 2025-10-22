'use client'
import Background from "@/app/components/assets/mainBackground.png";
import DiceComponent from "@/app/components/dice/dice";
import GameMaster from "@/app/components/gameMaster/gameMaster";


export default function Game() {
  // cast Dice to any so we can pass custom props without a type error
  const Dice: any = DiceComponent;

  const handleDiceSelect = (data: any) => {

  }

  return (
    <div>
        <div className="game-master-box">
          <GameMaster />
        </div>
        <div className="dice-box">
          <Dice onAction={handleDiceSelect} />
        </div>
        <main className="game">
          <img src={Background.src} alt="" />
          <div className="player-actions">
            <input type="text" placeholder="What do you do?" disabled/>
            {/* <button onClick={handleRoll}>
              ROLL
            </button>
            {rollResult !== null && (
              <div className="roll-result">
                Result: {rollResult}
              </div>
            )} */}
          </div>
        </main>
    </div>
  )
}