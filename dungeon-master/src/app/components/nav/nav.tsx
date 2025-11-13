'use client'
import { CgProfile } from "react-icons/cg"
import { useRouter } from "next/navigation";
import { GrBook } from "react-icons/gr";
import { SiDungeonsanddragons } from "react-icons/si";
import { CharacterIcon } from "@/app/components/character/characterIcon";

interface NavProps {
    title?: string;
    showLeaveButton?: boolean;
    onBookClick?: () => void; // optional: if provided, use this instead of navigating
    noShadow?: boolean; // optional: allow pages to disable navbar shadow
    characterIconId?: number; // optional: character icon ID to display
}

export default function Nav({ title = "Welcome to QuestWeaver", showLeaveButton = false, onBookClick, noShadow = false, characterIconId }: NavProps){
    const router = useRouter()
    return(
      <nav className="navbar" style={noShadow ? { boxShadow: 'none' } : undefined}>
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
            {characterIconId !== undefined ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(1.5)' }}>
                <CharacterIcon id={characterIconId} />
              </div>
            ) : (
              <CgProfile title="Character Sheet" className="character-icon" />
            )}
          </button>
          <button
            onClick={() => {
              if (onBookClick) {
                onBookClick()
              } else {
                router.push('./sessionHistory')
              }
            }}
          >
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