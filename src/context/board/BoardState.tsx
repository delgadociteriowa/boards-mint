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
  
  const phaseTwoSameSqr = (col: number, row: number): void => {
    const updateGrid = () => {
      const updated = [...state.gameGrid];
      updated[row][col] = {...updated[row][col], selected: false};
      return updated
    };
    dispatch({type: SET_GAME_GRID, payload: updateGrid()});
    dispatch({type: SET_SELECTED_SQR, payload: [null, null]});
    dispatch({type: DEACTIVATE_PHASE_TWO});
  };
  
  const phaseTwoEmptySqr = (col: number, row: number): void => {
    const selectedState = state.gameGrid[state.selectedSqr[0] || 0][state.selectedSqr[1] || 0];
    const updateGrid = () => {
      const updated = [...state.gameGrid];
      updated[row][col] = {
        ...updated[row][col],
        piece: selectedState.piece,
        pieceType: selectedState.pieceType
      };
      updated[state.selectedSqr[0] || 0][state.selectedSqr[1] ||0] = {
        ...updated[state.selectedSqr[0] || 0][state.selectedSqr[1] || 0],
        piece: '',
        pieceType: '',
        selected: false
      };
      return updated
    };
    dispatch({type: SET_GAME_GRID, payload: updateGrid()});
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

  const benchesFilled = (): void => {
    const updateGrid = () => {
      const updated = [...state.gameGrid];
      const row = state.selectedSqr[0] || 0;
      const col = state.selectedSqr[1] || 0; 
      updated[row][col] = {...updated[row][col], selected: false};
      return updated
    };
    dispatch({type: SET_GAME_GRID, payload: updateGrid()});
  };

  const benchesAreFilled = (): boolean => {
    const benchRows = [0, 1, 10, 11];

    return benchRows.every(rowIndex =>
      state.gameGrid[rowIndex].every(square => square.piece !== "")
    );
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

  const phaseOneAction = (col: number, row: number): void => {
    const updateGrid = () => {
      const updated = [...state.gameGrid];
      updated[row][col] = {...updated[row][col], selected: true};
      return updated
    }; 
    dispatch({type: SET_GAME_GRID, payload: updateGrid()});
    dispatch({type: SET_SELECTED_SQR, payload: [row, col]});
    dispatch({type: ACTIVATE_PHASE_TWO});
  };

  const placeChessPiece = (row: number, col: number): [Piece, PieceType] => {
    const playerOnePawnsRow = 3;
    const playerTwoPawnsRow = 8;
    const playerOneChessRow = 2;
    const playerTwoChessRow = 9;

    const chessPieces: Piece[] = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
    let piece: Piece = '';
    let pieceType: PieceType = '';

    switch (row) {
      case playerOneChessRow:
        piece = chessPieces[col] || '';
        pieceType = 'one';
        break;
      case playerOnePawnsRow:
        piece = '♟';
        pieceType = 'one';
        break;
      case playerTwoPawnsRow:
        piece = '♟';
        pieceType = 'two';
        break;
      case playerTwoChessRow:
        piece = chessPieces[col] || '';
        pieceType = 'two';
        break;
      default:
        break;
    }
    return [piece, pieceType];
  };

  const placeCheckerPiece = (row: number, col: number): [Piece, PieceType] => {
    const playerOneRows = [2, 3, 4];
    const playerTwoRows = [7, 8, 9];
    const isPlayerOne = playerOneRows.includes(row);
    const isPlayerTwo = playerTwoRows.includes(row);
    const isEvenCol = (col + 1) % 2 === 0;

    const shouldPlace =
      (isPlayerOne && ((row === 3 && !isEvenCol) || (row !== 3 && isEvenCol))) ||
      (isPlayerTwo && ((row === 8 && isEvenCol) || (row !== 8 && !isEvenCol)));

    const piece: Piece = shouldPlace ? 'checker' : '';
    const pieceType: PieceType = shouldPlace ? (isPlayerOne ? 'one' : 'two') : '';
            
    return [piece, pieceType]
  }

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

  const selectGame = (game: SelectedGame): void => {
    dispatch({type: SET_GAME, payload: game});
    dispatch({ type: SET_GAME_GRID, payload: [] });
  };

  const setGrid = (grid: Grid): void => {
    dispatch({type: SET_GAME_GRID, payload: grid});
  };

  const emptyGame = (): void => {
    dispatch({type: SET_GAME, payload: ''});
    dispatch({ type: SET_GAME_GRID, payload: [] });
  }; 

  const onClickPiece = (cell: string): void => {
    const [col, row] = cell.replace('sqr', '').split('-').map(n => Number(n));
  
    if(!state.phaseTwo){
      phaseOneAction(col, row);
    } else {
      phaseTwoAction(col, row);
    }
  }

  return (
    <boardContext.Provider
      value={{
        selectedGame: state.selectedGame,
        gameGrid: state.gameGrid,
        selectedSqr: state.selectedSqr,
        phaseTwo: state.phaseTwo,
        buildGameGrid,
        selectGame,
        setGrid,
        emptyGame,
        onClickPiece
      }}
    >
      {children}
    </boardContext.Provider>
  )
};

export default BoardState;