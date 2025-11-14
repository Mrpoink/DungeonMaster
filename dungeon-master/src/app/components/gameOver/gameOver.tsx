'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"
import happyDuck from '../assets/yellowduckling.gif'
import sadDuck from '../assets/cryingduck.gif'

export default function GameOver({result}:{result: boolean}){
    const endText = result 
        ? 'Congratulations! You made it to the end. Thanks for playing!'
        : 'Sorry! Try again next time.';
    const endGif = result
        ? (<Image 
            className="end-gif" 
            id="happy-duck"
            src={happyDuck} 
            alt="" 
            width={50}
            height={50}
            />)
        : (<Image 
            className="end-gif" 
            src={sadDuck} 
            alt=""
            width={50}
            height={50}
            unoptimized={true}
            />);
    return(
        <div className="game-over">
            <div className="game-over-text">
                {endText}
            </div>
            <div className="game-over-gif">
                {endGif}
            </div>
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