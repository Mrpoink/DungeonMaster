'use client'

export default interface Character{
    name: string;
    race: string;
    class: string;
    subclass: string;
    stats: Record<string, number>;
    skills: Record<string, boolean>;
}