'use client'
import React from "react";
import { CgProfile } from "react-icons/cg";
import { GiAquarium, GiArrowed, GiAstronautHelmet, GiPlagueDoctorProfile, GiRabbit } from "react-icons/gi"


const availableIcons = [
    {id: 0, Component: <CgProfile className="w-8 h-8"/>},
    {id: 1, Component: <GiPlagueDoctorProfile className="w-8 h-8"/>},
    {id: 2, Component: <GiAquarium className="w-8 h-8"/>},
    {id: 3, Component: <GiRabbit className="w-8 h-8"/>},
    {id: 4, Component: <GiArrowed className="w-8 h-8"/>},
    {id: 5, Component: <GiAstronautHelmet className="w-8 h-8"/>},
]

export function CharacterIcon({ id }: { id: number }) {
    const iconProps = { className: "w-6 h-6" };
    switch (id) {
        case 1: return <GiPlagueDoctorProfile {...iconProps}/>;
        case 2: return <GiAquarium {...iconProps}/>;
        case 3: return <GiRabbit {...iconProps}/>;
        case 4: return <GiArrowed {...iconProps}/>;
        case 5: return <GiAstronautHelmet {...iconProps}/>;
        default: return <CgProfile {...iconProps}/>;
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
                className={`
                    icon-button flex items-center justify-center p-3 h-16 w-16
                    ${isSelected ? 'icon-selected' : ''}
                `}
                role="button"
                tabIndex={0}
            >
                {icon.Component}
            </div>
        )
    })

    return(
        <div className="icon-select-container">
            {iconElements}
        </div>
    )
}