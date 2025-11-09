'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CharacterCreation from '@/app/components/character/characterCreation'

export default function CharacterPage() {
    const router = useRouter()

    useEffect(() => {
        // Check if user is logged in
        const username = localStorage.getItem('username')
        if (!username) {
            router.push('/login')
        }
    }, [router])

    return (
        <div className="character-page">
            <h1>Create Your Character</h1>
            <CharacterCreation />
        </div>
    )
}