export type PieceType = 'one' | 'two' | '';
export type Piece = '♟' |'♜' | '♞' | '♝' | '♛' | '♚' | 'checker' | '' ;
export type SelectedGame = 'chess' | 'checkers' | '';
export type Grid = Square[][];
export type SelectedSquare = [number, number] | [null, null];

export interface Square { 
  id: string;
  piece: Piece;
  pieceType: PieceType;
  selected: boolean;
};

export interface BoardStateType {
  id: string;
  owner: string;
  selectedGame: SelectedGame;
  gameGrid: Grid;
  selectedSqr: SelectedSquare;
  phaseTwo: boolean;
  loading: boolean;
  error: string | null;
  createdAt: string;
  updatedAt: string;
};

// activar/desactivar save sin depender de saveEnabled:boolean