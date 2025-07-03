'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

interface GlobalContextType {
  selectedGame: string;
  setSelectedGame: React.Dispatch<React.SetStateAction<string>>;
  buildGameGrid: () => Square[][];
  gameGrid: Square[][];
  setGameGrid: React.Dispatch<React.SetStateAction<Square[][]>>;
};

type Square = { 
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
};

type SelectedSquare = [number | null, number | null];

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [gameGrid, setGameGrid] = useState<Square[][]>([]);

  const placeChessPiece = (row: number, col: number): [string, string] => {
    const playerOnePawnsRow = 3;
    const playerTwoPawnsRow = 8;
    const playerOneChessRow = 2;
    const playerTwoChessRow = 9;

    const chessPieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
    let piece = '';
    let pieceType = '';

    switch (row) {
      case playerOneChessRow:
        piece = chessPieces[col] || '';
        pieceType = 'one';
        break;
      case playerOnePawnsRow:
        piece = '♟';
        pieceType = 'one';
        break;
      case playerTwoPawnsRow:
        piece = '♟';
        pieceType = 'two';
        break;
      case playerTwoChessRow:
        piece = chessPieces[col] || '';
        pieceType = 'two';
        break;
      default:
        break;
    }
    return [piece, pieceType];
  };

  const placeCheckerPiece = (row: number, col: number): [string, string] => {
    const playerOneRows = [2, 3, 4];
    const playerTwoRows = [7, 8, 9];
    const isPlayerOne = playerOneRows.includes(row);
    const isPlayerTwo = playerTwoRows.includes(row);
    const isEvenCol = (col + 1) % 2 === 0;

    const shouldPlace =
      (isPlayerOne && ((row === 3 && !isEvenCol) || (row !== 3 && isEvenCol))) ||
      (isPlayerTwo && ((row === 8 && isEvenCol) || (row !== 8 && !isEvenCol)));

    const piece = shouldPlace ? 'checker' : '';
    const pieceType = shouldPlace ? (isPlayerOne ? 'one' : 'two') : '';
            
    return [piece, pieceType]
  }

  const buildGameGrid = () :Square[][] => {
    const boardRows = 12;
    const boardColumns = 8;

    return Array(boardRows).fill(null).map((_, rowIndex) =>
      Array(boardColumns).fill(null).map((_, colIndex) => {
        const piece = selectedGame === 'chess' ? placeChessPiece(rowIndex, colIndex) : placeCheckerPiece(rowIndex, colIndex);  
        return { 
          id: `sqr${colIndex}-${rowIndex}`,
          piece: piece[0],
          pieceType: piece[1],
          selected: false
        };
      })
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        buildGameGrid,
        gameGrid,
        setGameGrid
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
