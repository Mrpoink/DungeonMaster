'use client'
import { useRouter } from "next/navigation";

export default function Home() {
const router = useRouter()

  return (
    <div className="main">
      <header>
        <h1>Welcome to the Dungeon</h1>
      </header>
      <main>
        <div>
          <em>What action will you take?</em>
          <div className="start-buttons-container">
            
            <button className="start-buttons" type='button' onClick={()=>router.push('./components/login')}>Login</button>
            <button className="start-buttons" type='button' onClick={()=>router.push('./components/register')}>Create an Account</button>
            <button className="start-buttons" type='button' onClick={()=>router.push('./components/lobby')}>Quick Start</button>
          </div>
        </div>

      </main>
      <footer className="footer">
        <sub>
          Adithaya Kulkarni, Brandon Dean, Elijah Webb, Tierra Williams
        </sub>
      </footer>
    </div>
  );
}
