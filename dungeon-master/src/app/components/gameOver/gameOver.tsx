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
        ? (<Image src={happyDuck} alt="" />)
        : (<Image src={sadDuck} alt="" />);
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