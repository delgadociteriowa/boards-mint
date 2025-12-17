export type PieceType = 'one' | 'two' | '';
export type Piece = '♟' |'♜' | '♞' | '♝' | '♛' | '♚' | 'checker' | '' ;
export type SelectedGame = 'chess' | 'checkers' | '';
export type Grid = Square[][];
export type SelectedSquare = [number | null, number | null];
export type Cell = `sqr${number}-${number}`;

export interface Square { 
  id: string;
  piece: Piece;
  pieceType: PieceType;
  selected: boolean;
};

export interface BoardContextType {
  selectedGame: SelectedGame;
  gameGrid: Square[][];
  selectedSqr: SelectedSquare;
  phaseTwo: boolean;
  buildGameGrid: () => Square[][];
  selectGame: (game: SelectedGame) => void;
  setGrid: (grid: Grid) => void; 
  emptyGame: () => void; 
  onClickPiece: (cell: Cell) => void;
};

export type BoardAction =
  | { type: 'SET_GAME'; payload: SelectedGame }
  | { type: 'SET_GAME_GRID'; payload: Square[][] }
  | { type: 'SET_SELECTED_SQR'; payload: [number | null, number | null] }
  | { type: 'ACTIVATE_PHASE_TWO' }
  | { type: 'DEACTIVATE_PHASE_TWO' };

export interface BoardStateType {
  selectedGame: SelectedGame;
  gameGrid: Square[][];
  selectedSqr: [number | null, number | null];
  phaseTwo: boolean;
};
