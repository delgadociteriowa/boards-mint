'use client';
import { createContext } from 'react';

interface BoardContextType {
  selectedGame: string;
  gameGrid: Square[][];
  selectedSqr: SelectedSquare;
  phaseTwo: boolean;
  buildGameGrid: () => Square[][];
  emptyGame: () => void;
  selectGame: (game: string) => void;
  setGrid: (grid: Grid) => void; 
  onClickPiece: (cell: string) => undefined;
};

type Square = { 
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
};

type Grid = Square[][];

type SelectedSquare = [number | null, number | null];

const boardContext = createContext<BoardContextType | null>(null);

export default boardContext;