import {CSSTransition,TransitionGroup} from 'react-transition-group'
import {SetStateAction, useEffect, useRef, useState} from 'react';
import random from 'random';
import {Row} from './game/row'
import { GameProvider, useGameContext } from './game/game_context';
import { Score, Scoreboard } from './game/scoreboard';
import { getScoreBoard, getUserData, updateHighestScore } from './firebase/firestore';
import { RegisterWindow } from './login-register/register';
import { LoginWindow } from './login-register/login';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { DocumentData, getFirestore } from 'firebase/firestore';
export function Game(){
    return (
        <GameProvider>
            <GameContent/>
        </GameProvider>
    )
}
export function GameContent(){
    const { rows, currentRowIndex, score, gameOver, resetGame , lifeline , handleLifeline, usedLifeline, setUsedLifeline} = useGameContext();
    const prevRowIndexRef = useRef<number | null>(null);
    const [isLoginWindowOpen, setIsLoginWindowOpen] = useState(false);
    const [isRegisterWindowOpen, setIsRegisterWindowOpen] = useState(false);
    const [isScoreboardOpen, setIsScoreboardOpen] = useState(false);
    const [scoresList, setScoresList] = useState<Score[]>([]);
    const [userData,setUserData] = useState<DocumentData | null | undefined>(null);
    const startIndex = Math.max(0, currentRowIndex - 2);
    const endIndex = Math.min(rows.length, currentRowIndex + 3);
    const [visibleRows, setVisibleRows] = useState(rows.slice(startIndex,endIndex));

    useEffect(() => {
        async function getUser(){
            const userData = await getUserData();
            // setUserData(userData);
            return userData
        }
        getUser().then((result) => setUserData(result));
        
    },[gameOver]);
    useEffect(() => {
        async function fetchScores(){
            await updateHighestScore(score);
            const scores = await getScoreBoard();
            // setScoresList(scores);
            return scores!
        }
        fetchScores().then((result) => setScoresList(result));
    },[gameOver])
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
    const gameContent = (
        <div className='relative items-center overflow-hidden w-screen h-screen box-border sm:size-min'>
            {gameOver ? (
                <div className='flex flex-col justify-center items-center h-screen'>
                    <h1 className='text-8xl mb-16'>Game Over</h1>
                    <p className='text-2xl mb-4'>Your score is {score}! Try again, you can do better!</p>
                    <button className='bg-blue-500 text-white p-4 rounded mt-2' onClick={resetGame}>Play Again</button>
                    
                    {userData === null ? (
                        <>
                    <p className='text-2xl mb-4 mt-16'>If you want to save your score and see yourself in the scoreboard, create an account!</p>
                    <div className='flex flex-row justify-center items-center space-x-8'>
                        <button className='bg-blue-500 text-white p-4 rounded mt-2' onClick={() => setIsRegisterWindowOpen(true)}>Let's create!</button>
                        <button className='bg-blue-500 text-white p-4 rounded mt-2' onClick={() => setIsLoginWindowOpen(true)}>I already have!</button>
                    </div>
                        </>
                    ) : (
                        <p className='text-2exl mb-4 mt-16'></p>
                    )

                }
                </div>
            ) : (
                <div className='mr-8'> 
                    <div className='flex flex-col items-center w-full p-4 bg-gray-800 text-white flex-shrink'>
                    <div className='flex flex-row justify-around items-center w-screen p-4 max-w-4xl'>
                        <div className="lg:text-2xl xs:text-lg">
                            Score: {score}
                        </div>
                        <div className="lg:text-2xl xs:text-lg">
                            Lifelines: {lifeline}
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline z-50"
                            onClick={() => setIsScoreboardOpen(true)}
                        >
                            Scoreboard
                        </button>
                    </div>
                    <button
                        className="mt-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline z-50"
                        onClick={() => {
                            setUsedLifeline(true);
                            handleLifeline();
                        }}
                    >
                        Use Lifeline
                    </button>
                </div>
                        <div className='relative flex xs:right-12 lg:right-0 flex-col items-center justify-content w-screen h-screen bottom-24'>
                            <TransitionGroup>
                                {visibleRows.map((row, index) => (
                                    <CSSTransition
                                        key={row.id}
                                        timeout={1500}
                                        classNames="fade"
                                    >
                                        <div className={`${getRowClass(startIndex + index)} center-row xl:space-y-16 lg:space-y-12 md:space-y-8 sm:space-y-4 xs:space-x-4`}>
                                            {row.id + 1}
                                            <Row rowId={row.id} />
                                        </div>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </div>
                </div>
            )}
            <Scoreboard
                  isOpen={isScoreboardOpen}
                  onClose={() => setIsScoreboardOpen(false)}
                  scoresList={scoresList}
              />
              <RegisterWindow
                  isOpen={isRegisterWindowOpen}
                  setIsOpen={setIsRegisterWindowOpen}
              />
              <LoginWindow
                  isOpen={isLoginWindowOpen}
                  setIsOpen={setIsLoginWindowOpen}
              />
          </div>
      )
    return gameContent;
}