'use client'
import { useRouter } from "next/navigation";
import Image from "../assets/mainBackground.png";

export default function Game() {
const router = useRouter()

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
        <main className="game">
          <img src={Image.src} alt="" />
          <div className="player-actions">
            <input type="text" placeholder="What do you do?" />
            <button className="button-33">
              ROLL
            </button>
          </div>
        </main>
    </div>
  )
}