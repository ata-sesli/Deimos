import {SetStateAction, useEffect, useRef, useState} from 'react';
import random from 'random';

function _onClick(isCorrect: boolean, setBgColor: React.Dispatch<SetStateAction<string>>,setGuessMade: React.Dispatch<SetStateAction<boolean>>){
    const color = (isCorrect) ? 'bg-green-500' : 'bg-red-500';
    setBgColor(color);
    setGuessMade(true);
};
export function Circle({isCorrect = false, guessMade,setGuessMade}: {isCorrect: boolean,guessMade: boolean ,setGuessMade: React.Dispatch<React.SetStateAction<boolean>>}){
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
export function Game(){
    // const [rows, setRows] = useState([{ id: 0,isDone: false,correctCircle: _selectCorrectCircle()}]);
    const [rows, setRows] = useState(Array.from({ length: 5 }, (_, index) => ({ id: index, isDone: false, correctCircle: _selectCorrectCircle() })));
    const [currentRowIndex, setCurrentRowIndex] = useState(0);

    function _selectCorrectCircle() {
        const randomNumber = random.int(0, 2);
        return randomNumber;
    }
    const addNewRow = () => {
        setRows(prevRows => {
            const lastRow = prevRows[prevRows.length - 1];
            if (lastRow.isDone) {
                console.log('New row has been added!');
                return [{ id: prevRows.length, isDone: false,correctCircle: _selectCorrectCircle()}, ...prevRows];
            }
            return prevRows;
        });
    };
    const handleGuessMade = (rowId: number) => {
        setRows(prevRows => {
            return prevRows.map(row =>
                row.id === rowId ? { ...row, isDone: true } : row
            );
        });
        addNewRow();
    };
    const getRowClass = (index: number) => {
        if (index === currentRowIndex) return 'transform scale-200'; // Biggest row
        if (index === currentRowIndex - 1 || index === currentRowIndex + 1) return 'transform scale-150 pointer-events-none opacity-50'; // Middle rows
        if (index === currentRowIndex - 2 || index === currentRowIndex + 2) return 'transform scale-100 pointer-events-none opacity-50'; // Small rows
        return 'hidden'; // Completely hidden
    };
    /*
    return (
        <div className='flex flex-col justify-between items-center'>
            {rows.map(row => (
                <Row key={row.id} rowId={row.id} onGuessMade={handleGuessMade} isDone={row.isDone} correctCircle={row.correctCircle}/>
            ))}
        </div>
    );
    */
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className="flex flex-col space-y-8">
                {rows.map((row, index) => (
                    <div key={row.id} className={`transition-transform duration-300 ${getRowClass(index)}`}>
                        <Row rowId={row.id} onGuessMade={handleGuessMade} isDone={row.isDone} correctCircle={row.correctCircle} />
                    </div>
                ))}
            </div>
        </div>
    );
}