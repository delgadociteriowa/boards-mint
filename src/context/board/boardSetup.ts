import { SelectedGame, Grid, Piece, PieceType, SelectedSquare, Square } from "./boardTypes";

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
        id: `sqr${rowIndex}-${colIndex}`,
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
        id: `sqr${rowIndex}-${colIndex}`,
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

const selectSqrGrid = (selectedSqr: SelectedSquare, currentGrid: Grid): Grid => {
  const [row, col] = selectedSqr;
  return currentGrid.map((r, rIdx) => 
    rIdx === row
    ? r.map((c, cIdx) => 
        cIdx === col ?  { ...c, selected: true } : c
      )
    : r
  )
};

const targetedSelfGrid = (currentSelectedSqr: SelectedSquare, currentGrid: Grid): Grid => {
  const [row, col] = currentSelectedSqr;
  return currentGrid.map((r, rIdx) => 
    rIdx === row
      ? r.map((c, cIdx) => 
          cIdx === col ?  { ...c, selected: false } : c
        )
      : r
  )
};

const targetedEmptyGrid = (selectedEmptySqr: SelectedSquare, currentSelected: SelectedSquare,  currentGrid: Grid): Grid => {
  const [emptyRow, emptyCol] = selectedEmptySqr;
  const [currentRow, currentCol] = currentSelected;
  if (currentRow === null || currentCol === null) return currentGrid;

  const currentPieceSelected: Square = currentGrid[currentRow][currentCol];

  return currentGrid.map((r, rIdx) => {
      if(rIdx === emptyRow) {
        return r.map((c, cIdx) => 
          cIdx === emptyCol ? {...c, piece: currentPieceSelected.piece, pieceType: currentPieceSelected.pieceType} : c    
        ) 
      }
      if(rIdx === currentRow) {
        return r.map((c, cIdx) => 
          cIdx === currentCol ? {...c, piece: '', pieceType: '', selected: false} : c    
        ) 
      }
      return r
    }
  )
};



const targetedPieceGrid = (selectedFilledSqr: SelectedSquare, currentSelected: SelectedSquare,  currentGrid: Grid): Grid  => {
  // bech one
  const benchOneFree = currentGrid[0].concat(currentGrid[1]).find(cell => cell.piece === '');
  if (benchOneFree === undefined) return currentGrid;
  const [benchOneRow, benchOneCol] = benchOneFree.id.replace('sqr', '').split('-').map(n => Number(n));

  // bench two
  const benchTwoFree = currentGrid[10].concat(currentGrid[11]).find(cell => cell.piece === '');
  if (benchTwoFree === undefined) return currentGrid;
  const [benchTwoRow, benchTwoCol] = benchOneFree.id.replace('sqr', '').split('-').map(n => Number(n));

  // target piece
  const [filledRow, filledCol] = selectedFilledSqr;
  if (filledRow === null || filledCol === null) return currentGrid;
  const pieceTargeted: Square = currentGrid[filledRow][filledCol];

  // to-move piece
  const [currentRow, currentCol] = currentSelected;
  if (currentRow === null || currentCol === null) return currentGrid;
  const currentPieceSelected: Square = currentGrid[currentRow][currentCol];  


  return currentGrid.map((r, rIdx) => {
      //discard piece one
      if (pieceTargeted.pieceType === 'one' && rIdx === benchOneRow) {
        return r.map((c, cIdx) =>
          cIdx === benchOneCol ? {...c, piece:  pieceTargeted.piece, pieceType:  pieceTargeted.pieceType } : c
        )
      }
      //discard piece two
      if (pieceTargeted.pieceType === 'two' && rIdx === benchTwoRow) {
        return r.map((c, cIdx) =>
          cIdx === benchTwoCol ? {...c, piece:  pieceTargeted.piece, pieceType:  pieceTargeted.pieceType } : c
        )
      }
      // place current on target
      if (rIdx === filledRow) {
        return r.map((c, cIdx) =>
          cIdx === filledCol ? {...c, piece:  currentPieceSelected.piece, pieceType:  currentPieceSelected.pieceType } : c
        )
      }
      // empty target
      if (rIdx === currentRow) {
        return r.map((c, cIdx) =>
          cIdx === currentCol ? {...c, piece: '', pieceType: '', selected: false } : c
        )
      }
      return r
    }
  )
};

export {
  buildGameGrid,
  selectSqrGrid,
  targetedSelfGrid,
  targetedEmptyGrid,
  targetedPieceGrid
}