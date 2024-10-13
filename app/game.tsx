import {CSSTransition,TransitionGroup} from 'react-transition-group'
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

    const startIndex = Math.max(0, currentRowIndex - 2);
    const endIndex = Math.min(rows.length, currentRowIndex + 3);
    const [visibleRows, setVisibleRows] = useState(rows.slice(startIndex,endIndex));

    useEffect(() => {
        prevRowIndexRef.current = currentRowIndex;
        const nextStartIndex = Math.max(0, currentRowIndex - 2);
        const nextEndIndex = Math.min(rows.length, currentRowIndex + 3);
    
        const newVisibleRows = rows.slice(nextStartIndex, nextEndIndex);
        setVisibleRows(newVisibleRows);
      }, [rows, currentRowIndex]);

    const getRowClass = (index: number) => {
        const biggestRow = 'scale-150 opacity-100';
        const smallerRow = 'scale-100 opacity-75 pointer-events-none';
        const smallestRow = 'scale-75 opacity-50 pointer-events-none';

        if (index === currentRowIndex) return `${biggestRow} middle-row upper-to-middle`; // Current row (largest)
        if (index === currentRowIndex - 1) return `${smallerRow} lower-row middle-to-lower`; // Previous row (smaller)
        if (index === currentRowIndex - 2) return `${smallestRow} bottom-row lower-to-bottom`;
        if (index === currentRowIndex + 1) return `${smallerRow} upper-row top-to-upper`; // Next row (smaller)
        if (index === currentRowIndex + 2) return `${smallestRow} top-row none-to-top`;
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
    const gameContent = (
        <div className='relative justify-content items-center overflow-hidden w-screen h-screen box-border sm:size-min'>
            <div className="relative left-1/2 top-[1%] transform -translate-x-1/2 min-w-fit min-h-fit text-2xl">Score: {score}</div>
            <div className='relative flex xs:right-12 lg:right-0 flex-col items-center justify-content w-screen h-screen bottom-24'>
                    <TransitionGroup>
                    {visibleRows.map((row, index) => (
                      <CSSTransition
                        key={row.id}
                        timeout={1500}
                        classNames="fade"
                      >
                        <div className={`${getRowClass(startIndex + index)} center-row xl:space-y-16 lg:space-y-12 md:space-y-8 sm:space-y-4 xs:space-x-4`}>
                          {row.id}
                          <Row rowId={row.id} />
                        </div>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
            </div>
        </div>
      );

    return gameContent;
}