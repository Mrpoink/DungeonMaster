'use client'
import { useRouter } from "next/navigation";
import { BottomNav } from "@/app/components/nav/nav";

export default function CharacterInfo() {
  const router = useRouter()

  return (
    <div className="character-sheet">
        <div className="character-info">
            <h1>Name</h1>
            <div className="sub-info">
               <div>
                  <h2>Race:</h2>
               </div>
               <div>
                  <h2>Class:</h2>
                  <h3>Subclass:</h3>
                </div>
            </div>
            <div className="key-stats">
              <div>_ Strength</div>
              <div>_ Dexterity</div>
              <div>_ Constitution</div>
              <div>_ Intelligence</div>
              <div>_ Wisdom</div>
              <div>_ Charisma</div>
            </div>
            <div className="skills">
              <div>_ Acrobatics</div>
              <div>_ Animal Handling</div>
              <div>_ Arcana</div>
              <div>_ Athletics</div>
              <div>_ Deception</div>
              <div>_ History</div>
              <div>_ Insight</div>
              <div>_ Intimidation</div>
              <div>_ Investigation</div>
              <div>_ Medicine</div>
              <div>_ Nature</div>
              <div>_ Perception</div>
              <div>_ Performance</div>
              <div>_ Persuasion</div>
              <div>_ Religion</div>
              <div>_ Sleight of Hand</div>
              <div>_ Stealth</div>
              <div>_ Survival</div>
            </div>
        </div>
        <div className="bottom-nav-buttons">
          <button>Save</button>
          <BottomNav />
        </div>
    </div>
  )
}