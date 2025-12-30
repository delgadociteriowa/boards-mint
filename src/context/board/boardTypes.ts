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
  gameGrid: Grid;
  selectedSqr: SelectedSquare;
  phaseTwo: boolean;
};

export interface BoardContextType extends BoardStateType {
  handleGameSelection: (game: SelectedGame) => void;
  handleClickSqr: (clickedSqr: string) => void;
  handleExitGame: () => void;
};

export type BoardAction =
  | { type: 'SELECTED_GAME'; payload: SelectedGame }
  | { type: 'SELECTED_PIECE'; payload: string }
  | { type: 'TARGETED_SELF'} // does not need payload
  | { type: 'TARGETED_EMPTY'; payload: string}
  | { type: 'TARGETED_PIECE'; payload: string }
  | { type: 'CLOSED_GAME' };