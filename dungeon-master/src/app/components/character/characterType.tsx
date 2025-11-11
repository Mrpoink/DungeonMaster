'use client'

export default interface Character{
    name: string;
    race: string;
    class: string;
    subclass?: string;
    stats: { [key: string]: number };
    skills: { [key: string]: boolean };
    backstory: string;
}