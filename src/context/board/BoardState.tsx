'use client';
import { ReactNode, useReducer } from 'react';
import boardContext from './boardContext';
import BoardReducer from './boardReducer';
import { 
  SET_GAME,
  SET_GAME_GRID,
  SET_SELECTED_SQR,
  ACTIVATE_PHASE_TWO,
  DEACTIVATE_PHASE_TWO
} from '../types';
import {
  BoardStateType,
  Square,
  Grid,
  Piece,
  PieceType,
  SelectedGame } from './boardTypes';

const BoardState = ({ children }: { children: ReactNode }) => {

  const initialState: BoardStateType = {
    selectedGame: '',
    gameGrid: [],
    selectedSqr: [null, null],
    phaseTwo: false
  }

  const [state, dispatch] = useReducer(BoardReducer, initialState);

  // Build game grid

  const placeChessPiece = (row: number, col: number): [Piece, PieceType] => { 
    const chessPieces: Piece[] = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
    const chessPiece: Piece = chessPieces[col] ?? '';
    
    if (row === 2) return [chessPiece, 'one'];
    if (row === 3) return ['♟', 'one'];
    if (row === 8) return ['♟', 'two'];
    if (row === 9) return [chessPiece, 'two']; 

    return ['', ''];
  };

  const placeCheckerPiece = (row: number, col: number): [Piece, PieceType] => {
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
  
  // Phase-one action
  
  const phaseOneAction = (col: number, row: number): void => {
    const updatedGrid = state.gameGrid.map((gridRow, gridRowIdx) =>
      gridRowIdx === row
        ? gridRow.map((cell, cellIndex) =>
            cellIndex === col ? { ...cell, selected: true } : cell
          )
        : gridRow
    );

    dispatch({type: SET_GAME_GRID, payload: updatedGrid});
    dispatch({type: SET_SELECTED_SQR, payload: [row, col]});
    dispatch({type: ACTIVATE_PHASE_TWO});
  };
  
  // Phase-two action

  const benchesAreFilled = (): boolean => {
    const benchRows = [0, 1, 10, 11];

    return benchRows.every(rowIndex =>
      state.gameGrid[rowIndex].every(square => square.piece !== "")
    );
  };

  const benchesFilled = (): void => {
    const [row, col] = state.selectedSqr;

    if (row == null || col == null) return;

    const updatedGrid = state.gameGrid.map((gridRow, gridRowIndex) =>
      gridRowIndex === row
        ? gridRow.map((cell, cellIndex) =>
            cellIndex === col ? { ...cell, selected: false } : cell
          )
        : gridRow
    );
    dispatch({type: SET_GAME_GRID, payload: updatedGrid});
  };

  const phaseTwoSameSqr = (col: number, row: number): void => {
    const updatedGrid = state.gameGrid.map((gridRow, gridRowIndex) => 
      gridRowIndex === row
        ? gridRow.map((cell, cellIndex) =>
          cellIndex === col ? { ...cell, selected: false } : cell
        )
        : gridRow 
    );

    dispatch({type: SET_GAME_GRID, payload: updatedGrid});
    dispatch({type: SET_SELECTED_SQR, payload: [null, null]});
    dispatch({type: DEACTIVATE_PHASE_TWO});
  };

  const phaseTwoEmptySqr = (col: number, row: number): void => {
    const [selectedRowSqr, selectedColSqr] = state.selectedSqr;
    if (selectedRowSqr == null || selectedColSqr == null) return;

    const fromSquare = state.gameGrid[selectedRowSqr][selectedColSqr];

    const updatedGrid: Square[][] = state.gameGrid.map((gridRow, gridRowIndex) =>
      gridRow.map((cell, cellIndex) => {
        // add piece to new coord
        if (gridRowIndex === row && cellIndex === col) {
          return {
            ...cell,
            piece: fromSquare.piece,
            pieceType: fromSquare.pieceType,
          };
        }

        // remove piece from old coord
        if (gridRowIndex === selectedRowSqr && cellIndex === selectedColSqr) {
          return {
            ...cell,
            piece: '',
            pieceType: '',
            selected: false,
          };
        }

        return cell;
      })
    );

    dispatch({ type: SET_GAME_GRID, payload: updatedGrid });
  };

  const phaseTwoOccupiedSqr = (col: number, row: number): void => {
    const [ stepOneRow, stepOneCol] = state.selectedSqr; //step one piece
    if (stepOneRow == null || stepOneCol == null) return;

    const stepOneCell = state.gameGrid[stepOneRow][stepOneCol]; //step one cell
    const targetCell = state.gameGrid[row][col]; //step two cell
    
    const isPieceTypeOne = targetCell.pieceType === 'one'; // checks p1 or p2 piece

    const primaryDiscardRows = isPieceTypeOne ? [0, 1] : [10, 11]; // discard set 1 p1: rows 0 1 - p2: rows 10 11
    const secondaryDiscardRows = isPieceTypeOne ? [10, 11] : [0, 1]; // discard set 2 p1: rows 10 11 - p2: rows 0 1

    const findEmptyDiscard = (rows: number[]) =>
      rows.flatMap(r => state.gameGrid[r])
          .find(cell => cell.piece === ''); // find first available discard cell function

    const discardCell =
      findEmptyDiscard(primaryDiscardRows) ??
      findEmptyDiscard(secondaryDiscardRows); // discard cell, p1 0,1 -> 10,11. p2 10, 11 -> 0, 1.

    if (!discardCell) return; 

    const updatedGrid: Square[][] = state.gameGrid.map((gridRow, gridRowIndex) => // map first lvl 
      gridRow.map((cell, cellIndex) => { //map second lvl
        // finds discard and place target
        if (cell === discardCell) {
          return {
            ...cell,
            piece: targetCell.piece,
            pieceType: targetCell.pieceType,
          };
        }

        // finds destiny and places step one
        if (gridRowIndex === row && cellIndex === col) {
          return {
            ...cell,
            piece: stepOneCell.piece,
            pieceType: stepOneCell.pieceType,
          };
        }

        // empties step one origin
        if (gridRowIndex === stepOneRow && cellIndex === stepOneCol) {
          return {
            ...cell,
            piece: '',
            pieceType: '',
            selected: false,
          };
        }

        return cell;
      })
    );
    dispatch({ type: SET_GAME_GRID, payload: updatedGrid });
  };
  
  const phaseTwoAction = (col: number, row: number): void => {
    const selectedCellObj = state.gameGrid[row][col];
    function endPhaseTwo(){
      dispatch({type: SET_SELECTED_SQR, payload: [null, null]});
      dispatch({type: DEACTIVATE_PHASE_TWO});
    }

    // benches filled
    if (benchesAreFilled() && selectedCellObj.piece){
      benchesFilled();
      return endPhaseTwo()
    }
    
    // same cell
    if (state.selectedSqr[0] === row && state.selectedSqr[1] === col) {
      phaseTwoSameSqr(col, row);
      return endPhaseTwo()
    }
    
    // empty cell
    if(selectedCellObj.piece === '') {
      phaseTwoEmptySqr(col, row);
      return endPhaseTwo()
    }

    phaseTwoOccupiedSqr(col, row);
    return endPhaseTwo()    
  };

  // Context

  const selectGame = (game: SelectedGame): void => {
    dispatch({type: SET_GAME, payload: game});
    dispatch({ type: SET_GAME_GRID, payload: [] });
  };

  const setGrid = (grid: Grid): void => {
    dispatch({type: SET_GAME_GRID, payload: grid});
  };

  const buildGameGrid = () :Square[][] => {
    const boardRows = 12;
    const boardColumns = 8;

    return Array(boardRows).fill(null).map((_, rowIndex) =>
      Array(boardColumns).fill(null).map((_, colIndex) => {
        const piece = state.selectedGame === 'chess' ? placeChessPiece(rowIndex, colIndex) : placeCheckerPiece(rowIndex, colIndex);

        return { 
          id: `sqr${colIndex}-${rowIndex}`,
          piece: piece[0],
          pieceType: piece[1],
          selected: false
        };
      })
    );
  };

  const onClickPiece = (cell: string): void => {
    const [col, row] = cell.replace('sqr', '').split('-').map(n => Number(n));
  
    if(!state.phaseTwo){
      phaseOneAction(col, row);
    } else {
      phaseTwoAction(col, row);
    }
  }

  const emptyGame = (): void => {
    dispatch({type: SET_GAME, payload: ''});
    dispatch({ type: SET_GAME_GRID, payload: [] });
  };


  // const handleGameSelection() {}
  // const handleClickSqr() {}
  // const handleExitGame() {}

  return (
    <boardContext.Provider
      value={{
        selectedGame: state.selectedGame,
        gameGrid: state.gameGrid,
        selectedSqr: state.selectedSqr,
        phaseTwo: state.phaseTwo,
        selectGame,
        setGrid,
        buildGameGrid,
        onClickPiece,
        emptyGame
      }}
    >
      {children}
    </boardContext.Provider>
  )
};

export default BoardState;