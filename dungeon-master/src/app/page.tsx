'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Nav from "./components/nav/nav";
import Footer from "./components/footer/footer";

export default function Home() {
  const router = useRouter();
  const [hasUsername, setHasUsername] = useState(false);

  useEffect(() => {
    // Check if username exists in localStorage
    const savedUsername = localStorage.getItem('username');
    setHasUsername(!!savedUsername);
  }, []);

  return (
    <div className="main">
      <header>
        <Nav />
      </header>
      <main>
        <div>
          <div id="landing-text">
            <em>What action will you take?</em>
          </div>
          <div className="start-buttons-container">
            <button className="start-buttons" type='button' onClick={()=>router.push('./pages/credentials')}>Login</button>
            {hasUsername && (
              <button className="start-buttons" type='button' onClick={()=>router.push('./pages/lobby')}>Quick Start</button>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
