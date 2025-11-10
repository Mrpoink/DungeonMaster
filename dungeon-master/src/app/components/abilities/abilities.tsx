'use client'
import React from 'react';
import Character from '../character/characterType';

export default function AbilityProgressBar( {name, score}:{name: string, score: number} ) {
    const maxAbilityScore = 30;
    const currentScore = Math.min(Math.max(Number(score), 1), maxAbilityScore);
    const percentage = (currentScore / maxAbilityScore) * 100;

    const getColor = (percent: number) => {
        if (percent > 66) return 'bg-yellow-500'; // High scores
        if (percent > 33) return 'bg-yellow-600/70'; // Mid scores
        return 'bg-gray-500'; // Low scores
    };

    return (
        <div className="flex flex-col items-start p-3 bg-gray-700/70 rounded-xl border border-gray-600 shadow-md">
            <span className="text-xs uppercase font-bold text-yellow-400 mb-2 ability-label">{name}</span>
            <div className="w-full relative h-6 bg-gray-600 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${getColor(percentage)} transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-white">
                    {currentScore}
                </span>
            </div>
        </div>
    );
}

export function AbilityBars(){
    return(
        <div>
            <AbilityProgressBar 
              name={'INTELLECT'} 
              score={10}
            />
            <AbilityProgressBar 
              name={'MIGHT'} 
              score={15}
            />
            <AbilityProgressBar 
              name={'AGILITY'} 
              score={20}
            />
            <AbilityProgressBar 
              name={'PRESENCE'} 
              score={20}
            />
            <AbilityProgressBar 
              name={'WISDOM'} 
              score={20}
            />
            <AbilityProgressBar 
              name={'SPIRIT'} 
              score={20}
            />
          </div>
    )
}