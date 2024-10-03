import React, { createContext, ReactNode, useContext, useState } from 'react';
import random from 'random';

interface GameContextType {
    rows: { id: number, isDone: boolean, correctCircle: number }[];
    currentRowIndex: number;
    score: number;
    gameOver: boolean;
    handleGuessMade: (rowId: number) => void;
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
    const [rows, setRows] = useState(Array.from({ length: 10 }, (_, index) => ({ id: index, isDone: false, correctCircle: _selectCorrectCircle() })));
    const [currentRowIndex, setCurrentRowIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    function _selectCorrectCircle() {
        const randomNumber = random.int(0, 2);
        return randomNumber;
    }

    const addNewRow = () => {
        setRows(prevRows => {
            const lastRow = prevRows[prevRows.length - 1];
            if (lastRow.isDone) {
                console.log('New row has been added!');
                return [{ id: prevRows.length, isDone: false, correctCircle: _selectCorrectCircle() }, ...prevRows];
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
        setScore(prevScore => prevScore + 1);
        addNewRow();
    };

    const resetGame = () => {
        setRows(Array.from({ length: 5 }, (_, index) => ({ id: index, isDone: false, correctCircle: _selectCorrectCircle() })));
        setCurrentRowIndex(0);
        setScore(0);
        setGameOver(false);
    };

    return (
        <GameContext.Provider value={{ rows, currentRowIndex, score, gameOver, handleGuessMade, resetGame }}>
            {children}
        </GameContext.Provider>
    );
};