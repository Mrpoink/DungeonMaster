'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Login from "./components/login/login";
import Register from "./components/register/register";

export default function Home() {
const router = useRouter()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header>
        <h1>Welcome to the Dungeon</h1>

      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <em>What action will you take?</em>
          <div className="start-buttons-container">
            
            <button className="start-buttons" type='button' onClick={()=>router.push('./components/login')}>Login</button>
            <button className="start-buttons" type='button' onClick={()=>router.push('./components/register')}>Create an Account</button>
            <button className="start-buttons" type='button' onClick={()=>router.push('./components/lobby')}>Quick Start</button>
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
