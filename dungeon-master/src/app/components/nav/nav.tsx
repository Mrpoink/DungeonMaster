'use client'
import { CgProfile } from "react-icons/cg"
import { useRouter } from "next/navigation";
import { GrBook } from "react-icons/gr";
import { SiDungeonsanddragons } from "react-icons/si";
import { CharacterIcon } from "@/app/components/character/characterIcon";
import { useLoadingNavigation } from "@/app/hooks/useLoadingNavigation";
import { useLoading } from "@/app/components/LoadingContext";

interface NavProps {
    title?: string;
    showLeaveButton?: boolean;
    onBookClick?: () => void; // optional: if provided, use this instead of navigating
    noShadow?: boolean; // optional: allow pages to disable navbar shadow
    characterIconId?: number; // optional: character icon ID to display
    hideCharacterIcon?: boolean; // optional: hide the character icon completely
    showDndIcon?: boolean; // optional: show D&D icon next to title
}

export default function Nav({ title = "Welcome to QuestWeaver", showLeaveButton = false, onBookClick, noShadow = false, characterIconId, hideCharacterIcon = false, showDndIcon = false }: NavProps){
    const router = useRouter();
    const { navigateWithLoading } = useLoadingNavigation();
    const { showLoading } = useLoading();
    
    const handleLeaveExperience = () => {
        showLoading('Leaving experience...');
        requestAnimationFrame(() => {
            router.back();
        });
    };
    
    return(
      <nav className="navbar" style={noShadow ? { boxShadow: 'none' } : undefined}>
        <div className="nav-left">
            {showLeaveButton ? (
                <button className="leave-experience-button" onClick={handleLeaveExperience}>Leave Experience</button>
            ) : (
                <SiDungeonsanddragons className="dnd-icon" onClick={() => navigateWithLoading('/', 'Returning home...')}/>
            )}
        </div>
        <div className="nav-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5em' }}>
          {showDndIcon && <SiDungeonsanddragons style={{ fontSize: '1.5em', color: '#6b4a2e' }} />}
          <h1 className="nav-title" onClick={() => navigateWithLoading('/', 'Returning home...')}>{title}</h1>
        </div>
        <div className="nav-right">
          {!hideCharacterIcon && (
            <button onClick={()=>navigateWithLoading('./characterInfo', 'Loading character...')}>
              {characterIconId !== undefined ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(1.5)' }}>
                  <CharacterIcon id={characterIconId} />
                </div>
              ) : (
                <CgProfile title="Character Sheet" className="character-icon" />
              )}
            </button>
          )}
          <button
            onClick={() => {
              if (onBookClick) {
                onBookClick()
              } else {
                navigateWithLoading('./howToPlay', 'Loading guide...')
              }
            }}
          >
            <GrBook title="How to Play" className="character-icon" />
          </button>
        </div>
      </nav>
    )
}
export function BottomNav(){
    const { showLoading } = useLoading();
    const router = useRouter();
    
    const handleGoBack = () => {
        showLoading('Going back...'); // Show loading when going back
        requestAnimationFrame(() => {
            router.back();
        });
    }
    
    return(
        <button 
            onClick={handleGoBack}
            style={{
                backgroundColor: '#F6E3B8',
                backdropFilter: 'blur(8px)',
                color: '#6b4a2e',
                padding: '12px 24px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F6E3B8';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F6E3B8';
              e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            Return
        </button>
    )
}