'use client'
import React from "react";
import { CgProfile } from "react-icons/cg";
import { GiAquarium, GiArrowed, GiAstronautHelmet, GiPlagueDoctorProfile, GiRabbit } from "react-icons/gi"


const availableIcons = [
    {id: 0, Component: <CgProfile/>},
    {id: 1, Component: <GiPlagueDoctorProfile/>},
    {id: 2, Component: <GiAquarium/>},
    {id: 3, Component: <GiRabbit/>},
    {id: 4, Component: <GiArrowed/>},
]


export function CharacterIcon({ id }: { id: number }) {
    switch (id) {
        case 1: return <GiPlagueDoctorProfile />;
        case 2: return <GiAquarium />;
        case 3: return <GiRabbit />;
        case 4: return <GiArrowed />;
        case 5: return <GiAstronautHelmet />;
        default: return <CgProfile />;
    }
}

export default function SelectIcon({onIconSelect, currentIconId}: { onIconSelect: (id: number) => void; currentIconId: number }) {
    
    const handleIconSelect = (id: number) => {
        onIconSelect(id)
    }

    const iconElements = availableIcons.map((icon) => {
        const isSelected = icon.id === currentIconId;
        return (
            <div
                key={icon.id}
                onClick={() => handleIconSelect(icon.id)}
                className={`icon-item ${isSelected ? 'selected' : ''}`}
                role="button"
                tabIndex={0}
            >
                {icon.Component}
            </div>
        )
    })

    return(
        <div className="icon-select">
            {iconElements}
        </div>
    )
}