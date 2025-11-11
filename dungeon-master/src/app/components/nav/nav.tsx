'use client'
import { CgProfile } from "react-icons/cg"
import { useRouter } from "next/navigation";
import { GrBook } from "react-icons/gr";
import { SiDungeonsanddragons } from "react-icons/si";

interface NavProps {
    title?: string;
    showLeaveButton?: boolean;
}

export default function Nav({ title = "Welcome to QuestWeaver", showLeaveButton = false }: NavProps){
    const router = useRouter()
    return(
      <nav className="navbar">
        <div className="nav-left">
            {showLeaveButton ? (
                <button className="leave-experience-button" onClick={() => router.back()}>Leave Experience</button>
            ) : (
                <SiDungeonsanddragons className="dnd-icon" onClick={() => router.push('/')}/>
            )}
        </div>
        <div className="nav-center">
          <h1 className="nav-title" onClick={() => router.push('/')}>{title}</h1>
        </div>
        <div className="nav-right">
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