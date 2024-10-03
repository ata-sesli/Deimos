import { useEffect, useState } from "react";
import { useGameContext } from "./game_context";
import { Circle } from "./circle";

export function Row({rowId} : {rowId: number}){
    const { rows, handleGuessMade } = useGameContext();
    const row = rows.find(row => row.id === rowId);
    const [guessMade,setGuessMade] = useState(false);
    useEffect(() => {
        if (guessMade){
            handleGuessMade(rowId);
        }
    },[guessMade])

    if (!row) return null;

    return (
    <div className="flex flex-row items-center space-x-16 pt-4">
        <Circle isCorrect={row.correctCircle === 0} guessMade={guessMade} setGuessMade={setGuessMade}/>
        <Circle isCorrect={row.correctCircle === 1} guessMade={guessMade} setGuessMade={setGuessMade}/>
        <Circle isCorrect={row.correctCircle === 2} guessMade={guessMade} setGuessMade={setGuessMade}/>
    </div>
    )
}