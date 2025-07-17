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

type Square = { 
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
};

type Grid = Square[][];

type BoardState = {
  selectedGame: string;
  gameGrid: Square[][];
  selectedSqr: [number | null, number | null]; // ← tupla, no arreglo
  phaseTwo: boolean;
};

// type SelectedSquare = [number | null, number | null];

const BoardState = ({ children }: { children: ReactNode }) => {

  const initialState: BoardState = {
    selectedGame: '',
    gameGrid: [],
    selectedSqr: [null, null],
    phaseTwo: false
  }

  const [state, dispatch] = useReducer(BoardReducer, initialState);
  

  // functions
  const placeChessPiece = (row: number, col: number): [string, string] => {
    const playerOnePawnsRow = 3;
    const playerTwoPawnsRow = 8;
    const playerOneChessRow = 2;
    const playerTwoChessRow = 9;

    const chessPieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
    let piece = '';
    let pieceType = '';

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

  const placeCheckerPiece = (row: number, col: number): [string, string] => {
    const playerOneRows = [2, 3, 4];
    const playerTwoRows = [7, 8, 9];
    const isPlayerOne = playerOneRows.includes(row);
    const isPlayerTwo = playerTwoRows.includes(row);
    const isEvenCol = (col + 1) % 2 === 0;

    const shouldPlace =
      (isPlayerOne && ((row === 3 && !isEvenCol) || (row !== 3 && isEvenCol))) ||
      (isPlayerTwo && ((row === 8 && isEvenCol) || (row !== 8 && !isEvenCol)));

    const piece = shouldPlace ? 'checker' : '';
    const pieceType = shouldPlace ? (isPlayerOne ? 'one' : 'two') : '';
            
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

  const emptyGame = () => {
    dispatch({type: SET_GAME, payload: ''});
    dispatch({type: SET_GAME_GRID, payload: []});
  }
  
  const selectGame = (game: string) => {
    dispatch({type: SET_GAME, payload: game});
  }
  
  const setGrid = (grid: Grid) => {
    dispatch({type: SET_GAME_GRID, payload: grid});
  }

  const onClickPiece = (cell: string): undefined => {
    const selectedCell = cell.replace('sqr', '').split('-').map(Number);
    const col: number = selectedCell[0];
    const row: number = selectedCell[1];
  
    if(!state.phaseTwo){
      const updateGrid = () => {
        const updated = [...state.gameGrid];
        updated[row][col] = {...updated[row][col], selected: true};
        return updated
      }; 
      dispatch({type: SET_GAME_GRID, payload: updateGrid()});
      dispatch({type: SET_SELECTED_SQR, payload: [row, col]});
      dispatch({type: ACTIVATE_PHASE_TWO});
    } else {
      const selectedCellObj = state.gameGrid[row][col];
      if (state.selectedSqr[0] === row && state.selectedSqr[1] === col) {
        const updateGrid = () => {
          const updated = [...state.gameGrid];
          updated[row][col] = {...updated[row][col], selected: false};
          return updated
        };
        dispatch({type: SET_GAME_GRID, payload: updateGrid()});
        dispatch({type: SET_SELECTED_SQR, payload: [null, null]});
        dispatch({type: DEACTIVATE_PHASE_TWO});
      } else if(selectedCellObj.piece === '') {
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
      } else {
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
      }
      dispatch({type: SET_SELECTED_SQR, payload: [null, null]});
      dispatch({type: DEACTIVATE_PHASE_TWO});
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
