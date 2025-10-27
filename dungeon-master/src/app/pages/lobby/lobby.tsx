'use client'
import { useRouter } from "next/navigation";
import Nav from "@/app/components/nav/nav";
import {BottomNav} from "@/app/components/nav/nav";

export default function Home() {
const router = useRouter()

  return (
    <div className="lobby">
      <header>
        <Nav />
      </header>
      <main>
        <div>
          <div className="start-buttons-container">
            <div id="game-sessions-div">
              <div className="game-session" id="game-sessions-left-div">
                <button className="left-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
                <button className="left-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
                <button className="left-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
              </div>
              <div className="game-session" id="game-sessions-right-div">
                <button className="right-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
                <button className="right-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
                <button className="right-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="bottom-nav-buttons">
        <BottomNav />
      </div>
    </div>
  );
}
