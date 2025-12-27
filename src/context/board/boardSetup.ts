import { SelectedGame, Grid, Piece, PieceType } from "./boardTypes";

const buildChessGrid = (): Grid => {
  const rows = 12;
  const columns = 8;

  const placePiece = (row: number, col: number): [Piece, PieceType] => { 
    const chessPieces: Piece[] = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
    const chessPiece: Piece = chessPieces[col] ?? '';
    
    if (row === 2) return [chessPiece, 'one'];
    if (row === 3) return ['♟', 'one'];
    if (row === 8) return ['♟', 'two'];
    if (row === 9) return [chessPiece, 'two']; 

    return ['', ''];
  };

  return Array(rows).fill(null).map((_, rowIndex) =>
    Array(columns).fill(null).map((_, colIndex) => {
      const piece = placePiece(rowIndex, colIndex);

      return { 
        id: `sqr${colIndex}-${rowIndex}`,
        piece: piece[0],
        pieceType: piece[1],
        selected: false
      };
    })
  );
};

const buildCheCkersGrid = (): Grid => {
  const rows = 12;
  const columns = 8;

  const placePiece = (row: number, col: number): [Piece, PieceType] => {
    const isEvenCol = (col + 1) % 2 === 0;

    if ([2, 3, 4].includes(row)) {
      const valid = row === 3 ? !isEvenCol : isEvenCol;
      return valid ? ['checker', 'one'] : ['', ''];
    }

    if ([7, 8, 9].includes(row)) {
      const valid = row === 8 ? isEvenCol : !isEvenCol;
      return valid ? ['checker', 'two'] : ['', ''];
    }

    return ['', ''];
  }


  return Array(rows).fill(null).map((_, rowIndex) =>
    Array(columns).fill(null).map((_, colIndex) => {
      const piece = placePiece(rowIndex, colIndex);

      return { 
        id: `sqr${colIndex}-${rowIndex}`,
        piece: piece[0],
        pieceType: piece[1],
        selected: false
      };
    })
  );
};

const buildGameGrid = (selectedGame: SelectedGame): Grid => {
  if(selectedGame === 'chess'){
    return buildChessGrid()
  } 
  if(selectedGame === 'checkers'){
    return buildCheCkersGrid()
  }
  return []
};

const selectSqrGrid = () => {};
const targetedSelfGrid = () => {};
const targetedEmptyGrid = () => {};
const targetedPieceGrid = () => {};

export {
  buildGameGrid,
  selectSqrGrid,
  targetedSelfGrid,
  targetedEmptyGrid,
  targetedPieceGrid
}