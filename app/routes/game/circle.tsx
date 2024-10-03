import { SetStateAction, useEffect, useState } from "react";
import { useGameContext } from "./game_context";

export function Circle({isCorrect = false,guessMade,setGuessMade,circleIndex,rowId}: {isCorrect: boolean,guessMade: boolean, setGuessMade:React.Dispatch<React.SetStateAction<boolean>>,circleIndex: number,rowId: number}){
    const { guessedCircle, handleGuessMade } = useGameContext();
    const [bgColor,setBgColor] = useState('bg');
    const empty = " ";
    useEffect(() => {
        if (guessMade){
            const color = (isCorrect) ? 'bg-green-500' : 'bg-red-500';
            setBgColor(color);
        }
    },[guessMade,isCorrect])
    const handleClick = () => {
        if (!guessMade){
            setGuessMade(true);
            handleGuessMade(rowId, circleIndex);
        }
    }
    
    return (
        <button
            className={`flex p-4 text-white-border border border-[#10598e] hover:bg-[#10598e] rounded-full w-12 h-12 ${bgColor}`}
            onClick={handleClick}
            disabled={guessMade}
        >
            {empty}
        </button>
    );
}