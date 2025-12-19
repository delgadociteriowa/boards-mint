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
    const selectedCellObj = state.gameGrid[row][col];
    const isPieceTypeOne = state.gameGrid[row][col].pieceType === 'one';
    const discardPlaces = isPieceTypeOne ? [...state.gameGrid[0], ...state.gameGrid[1]] : [...state.gameGrid[10], ...state.gameGrid[11]]; 
    const discardPlacesTwo = isPieceTypeOne ? [...state.gameGrid[10], ...state.gameGrid[11]] : [...state.gameGrid[0], ...state.gameGrid[1]]; 
    const discardAvailable = discardPlaces.find(discardPlace => discardPlace.piece === '') ?? discardPlacesTwo.find(discardPlace => discardPlace.piece === '');
    const discardAvailableCol = discardAvailable?.id.replace('sqr', '').split('-').map(Number)[0];
    const discardAvailableRow = discardAvailable?.id.replace('sqr', '').split('-').map(Number)[1];
    const selectedSqrState = state.gameGrid[state.selectedSqr[0] || 0][state.selectedSqr[1] || 0];

    const updateGrid = () => {
      const updated = [...state.gameGrid];
      updated[discardAvailableRow || 0][discardAvailableCol || 0] = {
        ...updated[discardAvailableRow || 0][discardAvailableCol || 0],
        piece: selectedCellObj.piece,
        pieceType: selectedCellObj.pieceType
      };
      updated[row][col] = {
        ...updated[row][col],
        piece: selectedSqrState.piece,
        pieceType: selectedSqrState.pieceType
      };
      updated[state.selectedSqr[0] || 0][state.selectedSqr[1] || 0] = {
        ...updated[state.selectedSqr[0] || 0][state.selectedSqr[1] || 0],
        piece: '',
        pieceType:'',
        selected: false
      };
      return updated
    };
    dispatch({type: SET_GAME_GRID, payload: updateGrid()});
  };
  
  const phaseTwoAction = (col: number, row: number): void => {
    const selectedCellObj = state.gameGrid[row][col];
    const sameSqr = state.selectedSqr[0] === row && state.selectedSqr[1] === col;
    const emptySqr = selectedCellObj.piece === '';

    if (benchesAreFilled() && selectedCellObj.piece){
      benchesFilled();
    } else if (sameSqr) {
      phaseTwoSameSqr(col, row);
    } else if(emptySqr) {
      phaseTwoEmptySqr(col, row);
    } else {
      phaseTwoOccupiedSqr(col, row);
    }
    
    dispatch({type: SET_SELECTED_SQR, payload: [null, null]});
    dispatch({type: DEACTIVATE_PHASE_TWO});
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