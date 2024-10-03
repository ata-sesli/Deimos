import {SetStateAction, useEffect, useRef, useState} from 'react';
import random from 'random';
import {Row} from './game/row'
import { GameProvider, useGameContext } from './game/game_context';
export function Game(){
    return (
        <GameProvider>
            <GameContent/>
        </GameProvider>
    )
}
export function GameContent(){
    // const [rows, setRows] = useState([{ id: 0,isDone: false,correctCircle: _selectCorrectCircle()}]);
    // const [rows, setRows] = useState(Array.from({ length: 5 }, (_, index) => ({ id: index, isDone: false, correctCircle: _selectCorrectCircle() })));
    const { rows, currentRowIndex, score, gameOver, resetGame } = useGameContext();

    const getRowClass = (index: number) => {
        if (index === currentRowIndex) return 'transform scale-150'; // Biggest row
        if (index === currentRowIndex - 1) return 'transform scale-100 pointer-events-none opacity-75'; // Middle row (previous)
        if (index === currentRowIndex - 2) return 'transform scale-75 pointer-events-none opacity-50'; // Small row (previous)
        if (index === currentRowIndex + 1) return 'transform scale-100 pointer-events-none opacity-75'; // Middle row (next)
        if (index === currentRowIndex + 2) return 'transform scale-75 pointer-events-none opacity-50'; // Small row (next)
        return 'hidden'; // Completely hidden
    };
    if (gameOver) {
        return (
            <div className='flex flex-col justify-center items-center h-screen'>
                <h1 className='text-4xl mb-4'>Game Over</h1>
                <p className='text-2xl mb-4'>Your Score: {score}</p>
                <button className='bg-blue-500 text-white p-4 rounded' onClick={resetGame}>Play Again</button>
            </div>
        );
    }
    const startIndex = Math.max(0, currentRowIndex - 2);
    const endIndex = Math.min(rows.length, currentRowIndex + 3);

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className="text-2xl mb-4">Score: {score}</div>
            <div className='flex flex-col justify-center items-center h-screen'>
                <div className="flex flex-col-reverse space-y-16">
                    {rows.slice(startIndex, endIndex).map((row, index) => (
                        <div key={row.id} className={`transition-transform duration-300 ${getRowClass(startIndex + index)}`}>
                            <Row rowId={row.id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}