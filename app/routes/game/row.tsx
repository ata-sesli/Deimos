import { useEffect, useState } from "react";
import { Circle } from "./circle";
export function Row({onGuessMade, isDone = false,rowId,correctCircle} : {onGuessMade: (rowId: number) => void,isDone: boolean,rowId: number,correctCircle: number}){
    const [guessMade,setGuessMade] = useState(false);

    useEffect(() => {
        if (guessMade){
            onGuessMade(rowId);
        }
    },[guessMade])

    return (
    <div className="flex flex-row items-center space-x-16 pt-4">
        <Circle isCorrect ={correctCircle === 0} guessMade={guessMade} setGuessMade={setGuessMade}/>
        <Circle isCorrect ={correctCircle === 1} guessMade={guessMade} setGuessMade={setGuessMade}/>
        <Circle isCorrect ={correctCircle === 2} guessMade={guessMade} setGuessMade={setGuessMade}/>
    </div>
    )
}