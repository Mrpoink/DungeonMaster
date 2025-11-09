'use client'

import { useRouter } from "next/navigation"

export default function GameOver(){
    return(
        <div className="game-over">
            You made it to the end.
            Thanks for playing!
            <div className="game-over-button">
                <LeaveExperience/>
            </div>
        </div>
    )
}

export function LeaveExperience(){
    const router = useRouter()
    return(
        <button onClick={()=>router.back()}>
              Leave Experience
        </button>
    )
}