'use client'
import { useRouter } from "next/navigation";

export default function CharacterInfo() {
  const router = useRouter()

  return (
    <div className="character-sheet">
        <div className="character-main-info">
            <h1>Name</h1>
            <div>
              <h2>Race</h2>
            </div>
            <div>
              <h2>Class</h2>
              <h3>Subclass</h3>
            </div>
            <div>
              
            </div>
        </div>
        <div>
          <button>Save</button>
          <button onClick={()=>router.push("./lobby")}>Return</button>
        </div>
    </div>
  )
}