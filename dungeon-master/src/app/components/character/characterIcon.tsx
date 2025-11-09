'use client'
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GiAquarium, GiArrowed, GiAstronautHelmet, GiPlagueDoctorProfile, GiRabbit } from "react-icons/gi"

export function CharacterIcon({ id }: { id: number }) {
    switch (id) {
        case 1:
            return <GiPlagueDoctorProfile />;
        case 2:
            return <GiAquarium />;
        case 3:
            return <GiRabbit />;
        case 4:
            return <GiArrowed />;
        case 5:
            return <GiAstronautHelmet />;
        default:
            return <CgProfile />;
    }
}

export default function SelectIcon() {
    const [icon, setIcon] = useState(0)
    const handleIconSelect = (id: number) => {
        setIcon(id)
    }
    return(
        <div className="icon-select">
            <div className="character-icon">
                <GiPlagueDoctorProfile onClick={() => handleIconSelect(1)}/>
            </div>
            <div className="character-icon">
                <GiAquarium onClick={() => handleIconSelect(2)}/>
            </div>
            <div className="character-icon">
                <GiRabbit onClick={() => handleIconSelect(3)}/>
            </div>
            <div className="character-icon">
                <GiArrowed onClick={() => handleIconSelect(4)}/>
            </div>
            <div className="character-icon">
                <GiAstronautHelmet onClick={() => handleIconSelect(5)}/>
            </div>
            <div className="character-icon">
                <CgProfile onClick={() => handleIconSelect(0)}/>
            </div>
        </div>
    )
}