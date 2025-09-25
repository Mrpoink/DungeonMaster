'use client'
import { useRouter } from "next/navigation";

export default function Home() {
const router = useRouter()

  return (
    <div>
      <header>
        <h1>Welcome to the Dungeon</h1>

      </header>
      <main>
        <div>
          <em>What action will you take?</em>
          <div className="start-buttons-container">

            <button className="start-buttons" type='button' onClick={()=>router.push('/sessionHistory')}>Reminisce</button>

            <div id="game-sessions-div">
              <div id="game-sessions-left-div">
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
              </div>
              <div id="game-sessions-right-div">
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
              </div>
            </div>

          </div>
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <sub>
          Adithaya Kulkarni, Brandon Dean, Elijah Webb, Tierra Williams
        </sub>
      </footer>
    </div>
  );
}
