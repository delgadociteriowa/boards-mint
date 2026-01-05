import {
  SELECT_GAME,
  SELECT_PIECE,
  CLOSE_GAME
} from './boardTypes';

import {
  buildGameGrid,
  selectSqrGrid,
  targetedSelfGrid,
  targetedEmptyGrid,
  targetedPieceGrid,
  benchesAreFilled
} from './boardSetup';

import {
  BoardStateType,
  BoardAction,
  SelectedSquare
} from './boardTs';

const initialState: BoardStateType = {
  selectedGame: '',
  gameGrid: [],
  selectedSqr: [null, null],
  phaseTwo: false
}

const boardReducer = (state: BoardStateType = initialState, action: BoardAction): BoardStateType => {
  switch (action.type) {
    case SELECT_GAME:
      const newGrid = buildGameGrid(action.payload);
      return {
        ...state,
        selectedGame: action.payload,
        gameGrid: newGrid
      }
    case SELECT_PIECE:
      const [row, col] = action.payload.replace('sqr', '').split('-').map(n => Number(n));
      const selectedPiece: SelectedSquare = [row, col];
      const isSameSqr = row === state.selectedSqr[0] && col === state.selectedSqr[1];
      const emptySqr: SelectedSquare = [null, null]; 

      const updateState = () => {
        if (!state.phaseTwo) {
          return {
            ...state,
            gameGrid: selectSqrGrid(selectedPiece, state.gameGrid),
            selectedSqr: selectedPiece,
            phaseTwo: true,
          }
        }
      
        if (benchesAreFilled(state.gameGrid) || isSameSqr) {
          return {
            ...state,
            gameGrid: targetedSelfGrid(state.selectedSqr, state.gameGrid), 
            selectedSqr: emptySqr,
            phaseTwo: false
          }
        }
        
        if (state.gameGrid[row][col].piece === '') {
          return {
            ...state,
            gameGrid: targetedEmptyGrid(selectedPiece, state.selectedSqr, state.gameGrid),
            selectedSqr: emptySqr,
            phaseTwo: false,
          }
        }
        
        if (state.gameGrid[row][col].piece.length) {
          return {
            ...state,
            gameGrid: targetedPieceGrid(selectedPiece, state.selectedSqr, state.gameGrid),
            selectedSqr: emptySqr,
            phaseTwo: false,
          }
        }

        return {
          ...state
        }
      };

      return updateState()
    case CLOSE_GAME:
      return {
        ...state,
        selectedGame: '',
        gameGrid: [],
        selectedSqr: [null, null],
        phaseTwo: false
      }
    default:
      return state;
  }
};

export default boardReducer;