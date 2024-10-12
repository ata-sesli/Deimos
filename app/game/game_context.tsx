import React, { createContext, ReactNode, useContext, useState } from 'react';
import random from 'random';

interface GameContextType {
    rows: { id: number, isDone: boolean, correctCircle: number }[];
    currentRowIndex: number;
    score: number;
    gameOver: boolean;
    guessedCircle: number | null;
    handleGuessMade: (rowId: number,guessedCircle: number) => void;
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
        }
        else {
            setGameOver(true);
        } // 2000 milliseconds = 2 seconds delay
    };

    const resetGame = () => {
        setRows(Array.from({ length: 100 }, (_, index) => ({ id: index, isDone: false, correctCircle: _selectCorrectCircle() })));
        setCurrentRowIndex(0);
        setScore(0);
        setGameOver(false);
    };

    return (
        <GameContext.Provider value={{ rows, currentRowIndex,score, gameOver, guessedCircle, handleGuessMade, resetGame }}>
            {children}
        </GameContext.Provider>
    );
};