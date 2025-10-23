'use client'
import { useRouter } from "next/navigation";
import Footer from "./components/footer/footer";

export default function Home() {
const router = useRouter()

  return (
    <div className="main">
      <header>
        <h1>Welcome to QuestWeaver</h1>
      </header>
      <main>
        <div>
          <em>What action will you take?</em>
          <div className="start-buttons-container">
            
            <button className="start-buttons" type='button' onClick={()=>router.push('./pages/credentials')}>Login</button>
            <button className="start-buttons" type='button' onClick={()=>router.push('./pages/credentials')}>Create an Account</button>
            <button className="start-buttons" type='button' onClick={()=>router.push('./pages/lobby')}>Quick Start</button>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
