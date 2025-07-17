import { 
  SET_GAME,
  SET_GAME_GRID,
  SET_SELECTED_SQR,
  ACTIVATE_PHASE_TWO,
  DEACTIVATE_PHASE_TWO
} from '../types';

export interface BoardContextType {
  selectedGame: string;
  gameGrid: Square[][];
  selectedSqr: SelectedSquare;
  phaseTwo: boolean;
  buildGameGrid: () => Square[][];
  selectGame: (game: string) => void;
  setGrid: (grid: Grid) => void; 
  emptyGame: () => void; 
  onClickPiece: (cell: string) => undefined;
};

export type BoardStateType = {
  selectedGame: string;
  gameGrid: Square[][];
  selectedSqr: [number | null, number | null];
  phaseTwo: boolean;
};

export type BoardAction =
  | { type: typeof SET_GAME; payload: string }
  | { type: typeof SET_GAME_GRID; payload: Square[][] }
  | { type: typeof SET_SELECTED_SQR; payload: [number | null, number | null] }
  | { type: typeof ACTIVATE_PHASE_TWO }
  | { type: typeof DEACTIVATE_PHASE_TWO };

export type Square = { 
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
};

export type Grid = Square[][];

export type SelectedSquare = [number | null, number | null];




