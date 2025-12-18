export type PieceType = 'one' | 'two' | '';
export type Piece = '♟' |'♜' | '♞' | '♝' | '♛' | '♚' | 'checker' | '' ;
export type SelectedGame = 'chess' | 'checkers' | '';
export type Grid = Square[][];
export type SelectedSquare = [number | null, number | null];

export interface Square { 
  id: string;
  piece: Piece;
  pieceType: PieceType;
  selected: boolean;
};

export interface BoardStateType {
  selectedGame: SelectedGame;
  gameGrid: Square[][];
  selectedSqr: SelectedSquare;
  phaseTwo: boolean;
};

export interface BoardContextType extends BoardStateType {
  selectGame: (game: SelectedGame) => void;
  setGrid: (grid: Grid) => void; 
  buildGameGrid: () => Square[][];
  onClickPiece: (cell: string) => void;
  emptyGame: () => void; 
};

export type BoardAction =
  | { type: 'SET_GAME'; payload: SelectedGame }
  | { type: 'SET_GAME_GRID'; payload: Square[][] }
  | { type: 'SET_SELECTED_SQR'; payload: SelectedSquare }
  | { type: 'ACTIVATE_PHASE_TWO' }
  | { type: 'DEACTIVATE_PHASE_TWO' };