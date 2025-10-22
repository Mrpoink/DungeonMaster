'use client'
import { useRouter } from "next/navigation";

export default function CharacterInfo() {
  const router = useRouter()

  return (
    <div>
        <div>
            <h1>Character Sheet</h1>
        </div>
        <button>Save</button>
        <button>Return</button>
    </div>
  )
}