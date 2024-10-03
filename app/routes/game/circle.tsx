import { SetStateAction, useEffect, useState } from "react";

export function Circle({isCorrect = false,guessMade,setGuessMade}: {isCorrect: boolean,guessMade: boolean, setGuessMade:React.Dispatch<React.SetStateAction<boolean>>}){

    const [bgColor,setBgColor] = useState('bg');
    const empty = " ";
    useEffect(() => {
        if (guessMade){
            const color = (isCorrect) ? 'bg-green-500' : 'bg-red-500';
            setBgColor(color);
        }
    },[guessMade,isCorrect])
    function _onClick(isCorrect: boolean, setBgColor: React.Dispatch<SetStateAction<string>>,setGuessMade: React.Dispatch<SetStateAction<boolean>>){
        const color = (isCorrect) ? 'bg-green-500' : 'bg-red-500';
        setBgColor(color);
        setGuessMade(true);
    };
    const handleClick = () => {
        if (!guessMade){
            _onClick(isCorrect,setBgColor,setGuessMade);
        }
    }
    if (!guessMade){
        return (
            <button className={`flex  p-4 text-white-border border border-[#10598e]
             hover:bg-[#10598e] rounded-full w-12 h-12 ${bgColor}`} onClick={handleClick}
             >
                {empty}
             </button>
        );
    }
    else {
        return (
            <button className={`flex p-4 text-white-border border border-[#10598e]
                rounded-full w-12 h-12 ${bgColor}`}>
                    {empty}
                </button>
        )
    }
}