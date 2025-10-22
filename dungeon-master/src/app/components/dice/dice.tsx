// 'use client'
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Dice() {
//   const router = useRouter()
//   const [isRolling, setIsRolling] = useState(false);
//   const [result, setResult] = useState(1);

//   const handleRoll = () => {
//     setIsRolling(true);
//     setTimeout(() => {
//       const newResult = Math.floor(Math.random() * 20) + 1;
//       setResult(newResult);
//       setIsRolling(false);
//     }, 500); 
//   };

//   return (
//     <div>
//         <div id="d20"></div>
//         <button id="rollButton">Roll d20</button>
//     </div>
//   )
// }