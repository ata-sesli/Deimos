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
    const { rows, currentRowIndex, score, gameOver, resetGame } = useGameContext();
    const prevRowIndexRef = useRef<number | null>(null);
    const [rowsToAnimateOut, setRowsToAnimateOut] = useState<number[]>([]);
    useEffect(() => {
        prevRowIndexRef.current = currentRowIndex;
    }, [currentRowIndex]);

    useEffect(() => {
        if (prevRowIndexRef.current !== null && currentRowIndex > prevRowIndexRef.current) {
          const rowToAnimateOut = currentRowIndex - 3;
          if (rowToAnimateOut >= 0) {
            setRowsToAnimateOut((prev) => [...prev, rowToAnimateOut]);
          }
        }
      }, [currentRowIndex]);
    
      const handleAnimationEnd = (index: number) => {
        setRowsToAnimateOut((prev) => prev.filter((rowIndex) => rowIndex !== index));
      };

    const getRowClass = (index: number) => {
        const baseClass = '';
        const biggestRow = 'scale-150 opacity-100';
        const smallerRow = 'scale-100 opacity-75 pointer-events-none';
        const smallestRow = 'scale-75 opacity-50 pointer-events-none';

        if (rowsToAnimateOut.includes(index)) {
            return `${baseClass} ${smallestRow} bottom-to-none`;
          }
    
        if (index === currentRowIndex) return `${baseClass} ${biggestRow} middle-row upper-to-middle`; // Current row (largest)
        if (index === currentRowIndex - 1) return `${baseClass} ${smallerRow} lower-row middle-to-lower`; // Previous row (smaller)
        if (index === currentRowIndex - 2) return `${baseClass} ${smallestRow} bottom-row lower-to-bottom`; // Two rows before (smallest)
        if (index === currentRowIndex + 1) return `${baseClass} ${smallerRow} upper-row top-to-upper`; // Next row (smaller)
        if (index === currentRowIndex + 2) return `${baseClass} ${smallestRow} top-row none-to-top`; // Two rows after (smallest)
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
    
    const gameContentFlex = (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className="text-2xl mb-4">Score: {score}</div>
            <div className="flex flex-col-reverse space-y-16 items-center">
                {rows.slice(startIndex, endIndex).map((row, index) => (
                    <div key={row.id} className={`${getRowClass(startIndex + index)}`}>
                        <Row rowId={row.id} />
                    </div>
                ))}
            </div>
        </div>
    );
    const gameContentPositional = (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className="absolute top-0 w-screen text-2xl mb-4">Score: {score}</div>
            <div className='absolute top-20 space-y-8'>
                {rows.slice(startIndex, endIndex).map((row, index) => (
                    <div
                    key={row.id}
                    className={`${getRowClass(startIndex + index)}`}
                    onAnimationEnd={()=> handleAnimationEnd(startIndex + index)}
                    >
                    <Row rowId={row.id} />
                    </div>
                ))}
            </div>
        </div>
      );
    const gameContent = (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className="text-2xl mb-4">Score: {score}</div>
            <div className="grid grid-cols-1 gap-4 items-center">
                {rows.slice(startIndex, endIndex).map((row, index) => (
                    <div key={row.id} className={`${getRowClass(startIndex + index)}`}>
                        <Row rowId={row.id} />
                    </div>
                ))}
            </div>
        </div>
    );
    return gameContentPositional;
}