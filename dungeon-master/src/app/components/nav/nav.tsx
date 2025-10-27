'use client'
import { CgProfile } from "react-icons/cg"
import { useRouter } from "next/navigation";
import { GrBook } from "react-icons/gr";


export default function Nav(){
    const router = useRouter()
    return(
      <nav className="navbar">
        <h1>Welcome to QuestWeaver</h1>
        <div className="character-info-div">
          <button onClick={()=>router.push('./characterInfo')}>
            <CgProfile title="Character Sheet" className="character-icon" />
          </button>
          <button onClick={()=>router.push('./sessionHistory')}>
            <GrBook title="Session History" className="character-icon" />
          </button>
        </div>
      </nav>
    )
}
export function BottomNav(){
    const router = useRouter()
    const handleGoBack = () => {
        router.back();
    }
    return(
        <button onClick={handleGoBack}>Return</button>
    )
}