import React, { createContext, ReactNode, useContext, useState } from 'react';
import random from 'random';

interface GameContextType {
    rows: { id: number, isDone: boolean, correctCircle: number }[];
    currentRowIndex: number;
    score: number;
    gameOver: boolean;
    guessedCircle: number | null;
    lifeline: number;
    usingLifeline: boolean;
    handleGuessMade: (rowId: number,guessedCircle: number) => void;
    handleLifeline: () => void;
    resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [rows, setRows] = useState(Array.from({ length: 100 }, (_, index) => ({ id: index, isDone: false, correctCircle: _selectCorrectCircle() })));
    const [currentRowIndex, setCurrentRowIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [usingLifeline, setUsingLifeline] = useState(false);
    const [lifeline,setLifeline] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [guessedCircle, setGuessedCircle] = useState<number | null>(null);
    const [visibleRows, setVisibleRows] = useState([]);
    function _selectCorrectCircle() {
        const randomNumber = random.int(0, 2);
        return randomNumber;
    }

    const handleGuessMade = (rowId: number,guessedCircle: number) => {
        setRows(prevRows => {
            return prevRows.map(row =>
                row.id === rowId ? { ...row, isDone: true } : row
            );
        });

        const correctCircle = rows.find(row => row.id === rowId)?.correctCircle;
        /*
        setScore(prevScore => prevScore + 1);
        setCurrentRowIndex(prevIndex => prevIndex + 1);
        */
        if (correctCircle !== guessedCircle) {
            setScore(prevScore => prevScore + 1);
            setCurrentRowIndex(prevIndex => prevIndex + 1);
            if ((currentRowIndex + 1) % 3 === 0 && currentRowIndex !== 0) setLifeline((lifeline) => lifeline + 1);
        }
        else {
            setGameOver(true);
        } // 2000 milliseconds = 2 seconds delay
    };
    const handleLifeline = () => {
        if (lifeline > 0){
            setRows(prevRows => {
                return prevRows.map(row =>
                    row.id === currentRowIndex ? { ...row, isDone: true } : row
                );
            });
            setLifeline(lifeline => lifeline - 1);
            setScore(prevScore => prevScore + 1);
            setCurrentRowIndex(prevIndex => prevIndex + 1);
            setUsingLifeline(false);
        }
        else {
            alert("You don't have any lifelines!");
        }
    }
    const resetGame = () => {
        setRows(Array.from({ length: 100 }, (_, index) => ({ id: index, isDone: false, correctCircle: _selectCorrectCircle() })));
        setCurrentRowIndex(0);
        setScore(0);
        setLifeline(3);
        setGameOver(false);
    };

    return (
        <GameContext.Provider value={{ rows, currentRowIndex,score, gameOver, guessedCircle, handleGuessMade, resetGame ,lifeline ,handleLifeline, usingLifeline}}>
            {children}
        </GameContext.Provider>
    );
};