'use client';
import { createContext } from 'react';

interface BoardContextType {
  selectedGame: string;
  setSelectedGame: React.Dispatch<React.SetStateAction<string>>;
  buildGameGrid: () => Square[][];
  gameGrid: Square[][];
  setGameGrid: React.Dispatch<React.SetStateAction<Square[][]>>;
  selectedSqr: SelectedSquare;
  setSelectedSqr: React.Dispatch<React.SetStateAction<SelectedSquare>>;
  phaseTwo: boolean;
  setPhaseTwo: React.Dispatch<React.SetStateAction<boolean>>;
  onClickPiece: (cell: string) => undefined;
};

type Square = { 
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
};

type SelectedSquare = [number | null, number | null];

const boardContext = createContext<BoardContextType | null>(null);

export default boardContext;