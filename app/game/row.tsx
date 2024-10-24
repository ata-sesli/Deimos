import { useEffect, useState } from "react";
import { useGameContext } from "./game_context";
import { Circle } from "./circle";

export function Row({rowId} : {rowId: number}){
    const { rows, handleGuessMade , guessedCircle} = useGameContext();
    const row = rows.find(row => row.id === rowId);
    const [guessMade,setGuessMade] = useState(false);

    if (!row) return null;
    return (
    <div className="flex flex-row justify-content items-center sm:space-x-6 lg:space-x-16 xs:space-x-4 ">
        <Circle isCorrect={row.correctCircle !== 0} circleIndex={0} guessMade={guessMade} setGuessMade={setGuessMade} rowId={rowId}/>
        <Circle isCorrect={row.correctCircle !== 1} circleIndex={1} guessMade={guessMade} setGuessMade={setGuessMade} rowId={rowId}/>
        <Circle isCorrect={row.correctCircle !== 2} circleIndex={2} guessMade={guessMade} setGuessMade={setGuessMade} rowId={rowId}/>
    </div>
    )
}