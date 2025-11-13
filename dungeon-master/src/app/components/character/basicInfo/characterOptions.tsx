'use client'

import React from "react"

export interface characterOptionTypes {
    title: string,
    type: 'Race' | "Class" | 'Subclass',
    selectedOption: string | null,
    allOptions: string[],
    prerequisiteOption: string | null,
    dependencyMap: Record<string, string[]>,
    onSelect: (option:string) => void,
}


export const CharacterOptions: React.FC<characterOptionTypes> = ({
    title,
    type,
    selectedOption,
    allOptions,
    prerequisiteOption,
    dependencyMap,
    onSelect,
}) => {
    const isOptionAvailable = (option:string): boolean =>{
        if (type === 'Race'){
            return true
        }

        if (!prerequisiteOption) {
             return false;
        }

        const validOptions = dependencyMap[prerequisiteOption] || [];
        return validOptions.includes(option);
    }

    return (
        <div className="my-3">
            <label className="text-sm block mb-2 font-semibold">
                {title}
            </label>
            
            {!prerequisiteOption && type !== "Race" && (
                <p className="preselect-text">
                    Select a {type === 'Class' ? 'race' : 'class'} first.
                </p>
            )}

            <div className="flex flex-wrap gap-2">
                {allOptions.map((option) => {
                    const isAvailable = isOptionAvailable(option);
                    const isSelected = selectedOption === option;

                    if (!isAvailable) {
                        return null;
                    }

                    // Determine the button's visual state
                    let buttonClasses = 'race-button';

                    if (isSelected) {
                        buttonClasses += ' race-selected';
                    } else {
                        buttonClasses += '';
                    }

                    return (
                        <button
                            key={option}
                            onClick={() => isAvailable && onSelect(option)}
                            disabled={!isAvailable}
                            className={buttonClasses}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};