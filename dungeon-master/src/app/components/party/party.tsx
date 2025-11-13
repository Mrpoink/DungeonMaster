'use client'
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { CharacterIcon } from "../character/basicInfo/characterIcon";


export default function Party() {
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const handleClick = (selectedMember: string) => {
    setActiveMember(selectedMember);
  }

  return (
    <div className="">
        <div className="member">
          <div className="member-icon-div">
            <CharacterIcon id={0}/>
          </div>
          <div className="member-icon-div"><CgProfile onClick={() => handleClick("member1")} className={"member-icon" + (activeMember === 'member1' ? ' active-member' : '')}/></div>
          <div className="member-icon-div"><CgProfile onClick={() => handleClick("member2")} className={"member-icon" + (activeMember === 'member2' ? ' active-member' : '')}/></div>
          <div className="member-icon-div"><CgProfile onClick={() => handleClick("member3")} className={"member-icon" + (activeMember === 'member3' ? ' active-member' : '')}/></div>
          <div className="member-icon-div"><CgProfile onClick={() => handleClick("member4")} className={"member-icon" + (activeMember === 'member4' ? ' active-member' : '')}/></div>
          <div className="member-icon-div"><CgProfile onClick={() => handleClick("member5")} className={"member-icon" + (activeMember === 'member5' ? ' active-member' : '')}/></div>
          <div className="member-icon-div"><CgProfile onClick={() => handleClick("member6")} className={"member-icon" + (activeMember === 'member6' ? ' active-member' : '')}/></div>
        </div>
    </div>
  )
}
