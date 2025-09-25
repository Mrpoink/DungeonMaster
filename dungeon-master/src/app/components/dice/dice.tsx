'use client'
import { useRouter } from "next/navigation";

export default function Game() {
const router = useRouter()

  return (
    <div>
        <div id="d20"></div>
        <button id="rollButton">Roll d20</button>
    </div>
  )
}