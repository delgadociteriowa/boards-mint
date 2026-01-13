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
  createdAt: string;
  lastSaved: string;
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
  | { type: 'SELECT_GAME'; payload: SelectedGame }
  | { type: 'SELECT_PIECE'; payload: string }
  | { type: 'CLOSE_GAME' };