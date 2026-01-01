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
  console.log('selectSqrGrid');
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
  console.log('targetedSelfGrid');
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
  const [emptyRow, emptyCell] = selectedEmptySqr;
  const [currentRow, currentCell] = currentSelected;

  if (currentRow === null || currentCell === null) return currentGrid;

  const currentPieceSelected: Square = currentGrid[currentRow][currentCell];

  return currentGrid.map((r, rIdx) => {
    // not target or origin
    if (rIdx !== emptyRow && rIdx !== currentRow) return r;

    return r.map((cell, cIdx) => {
      // target
      if (rIdx === emptyRow && cIdx === emptyCell) {
        return {
          ...cell,
          piece: currentPieceSelected.piece,
          pieceType: currentPieceSelected.pieceType,
          selected: false,
        };
      }

      // origin
      if (rIdx === currentRow && cIdx === currentCell) {
        return {
          ...cell,
          piece: '',
          pieceType: '',
          selected: false,
        };
      }

      return cell;
    });
    }
  )
};



const targetedPieceGrid = (selectedFilledSqr: SelectedSquare, currentSelected: SelectedSquare,  currentGrid: Grid): Grid  => {
  console.log('targetedPieceGrid');
  // bench one
  const benchOneFree = currentGrid[0].concat([...currentGrid[1], ...currentGrid[10], ...currentGrid[11]]).find(cell => cell.piece === '');
  if (benchOneFree === undefined) return currentGrid;
  const [benchOneRow, benchOneCol] = benchOneFree.id.replace('sqr', '').split('-').map(Number);

  // bench two
  const benchTwoFree = currentGrid[10].concat([...currentGrid[11], ...currentGrid[0], ...currentGrid[1]]).find(cell => cell.piece === '');
  if (benchTwoFree === undefined) return currentGrid;
  const [benchTwoRow, benchTwoCol] = benchTwoFree.id.replace('sqr', '').split('-').map(Number);

  // target piece
  const [filledRow, filledCol] = selectedFilledSqr;
  if (filledRow === null || filledCol === null) return currentGrid;
  const pieceTargeted: Square = currentGrid[filledRow][filledCol];

  // to-move piece
  const [currentRow, currentCol] = currentSelected;
  if (currentRow === null || currentCol === null) return currentGrid;
  const currentPieceSelected: Square = currentGrid[currentRow][currentCol];  


  return currentGrid.map((r, rIdx) => {
    if (
      rIdx !== filledRow &&
      rIdx !== currentRow &&
      rIdx !== benchOneRow &&
      rIdx !== benchTwoRow
    ) return r;

    return r.map((cell, cIdx) => {

      // discard
      if (
        pieceTargeted.pieceType === 'one' &&
        rIdx === benchOneRow &&
        cIdx === benchOneCol
      ) {
        return { ...cell, piece: pieceTargeted.piece, pieceType: pieceTargeted.pieceType };
      }

      if (
        pieceTargeted.pieceType === 'two' &&
        rIdx === benchTwoRow &&
        cIdx === benchTwoCol
      ) {
        return { ...cell, piece: pieceTargeted.piece, pieceType: pieceTargeted.pieceType };
      }

      // move to target
      if (rIdx === filledRow && cIdx === filledCol) {
        return { ...cell, piece: currentPieceSelected.piece, pieceType: currentPieceSelected.pieceType };
      }

      // empty origin
      if (rIdx === currentRow && cIdx === currentCol) {
        return { ...cell, piece: '', pieceType: '', selected: false };
      }

      return cell;
    });
    }
  )
};

const benchesAreFilled = (grid: Grid): boolean => {
  const benchRows = [0, 1, 10, 11];

  return benchRows.every(rowIndex =>
    grid[rowIndex].every(square => square.piece !== "")
  );
};

export {
  buildGameGrid,
  selectSqrGrid,
  targetedSelfGrid,
  targetedEmptyGrid,
  targetedPieceGrid,
  benchesAreFilled
}