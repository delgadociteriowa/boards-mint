import {
  SET_GAME,
  SET_GAME_GRID,
  SET_SELECTED_SQR,
  ACTIVATE_PHASE_TWO,
  DEACTIVATE_PHASE_TWO,
  SELECTED_GAME,
  SELECTED_PIECE,
  TARGETED_SELF,
  TARGETED_EMPTY,
  TARGETED_PIECE,
  FILLED_BENCHES,
  CLOSED_GAME,
} from '../types'

import { BoardStateType, BoardAction, SelectedSquare } from './boardTypes';

import {
  buildGameGrid,
  selectSqrGrid,
  targetedSelfGrid,
  targetedEmptyGrid,
  targetedPieceGrid
} from './boardSetup';

const boardReducer = (state: BoardStateType, action: BoardAction): BoardStateType => {
  switch(action.type) {
    case SET_GAME:
      return {
        ...state,
        selectedGame: action.payload, 
      }    
    case SET_GAME_GRID:
      return {
        ...state,
        gameGrid: action.payload,
      }
    case SET_SELECTED_SQR:
      return {
        ...state,
        selectedSqr: action.payload,
      }
    case ACTIVATE_PHASE_TWO:
      return {
        ...state,
        phaseTwo: true,
      }
    case DEACTIVATE_PHASE_TWO:
      return {
        ...state,
        phaseTwo: false,
      }
    case SELECTED_GAME:
      const newGrid = buildGameGrid(action.payload);
      return {
        ...state,
        selectedGame: action.payload,
        gameGrid: newGrid
      }
    case SELECTED_PIECE:
      const [row, col] = action.payload.replace('sqr', '').split('-').map(n => Number(n));
      const selectedPiece: SelectedSquare = [row, col];
      const selectedSqrGrid = selectSqrGrid(selectedPiece, state.gameGrid);
      return {
        ...state,
        gameGrid: selectedSqrGrid,
        selectedSqr: selectedPiece,
        phaseTwo: true,
      }
    case TARGETED_SELF:
      const selectedSelfGrid = targetedSelfGrid(state.selectedSqr, state.gameGrid);
      return {
        ...state,
        gameGrid: selectedSelfGrid,
        selectedSqr: [null, null],
        phaseTwo: false,
      }
    case TARGETED_EMPTY:
      const [targetEmptyRow, targetEmptyCol] = action.payload.replace('sqr', '').split('-').map(n => Number(n));
      const emptySqr: SelectedSquare = [targetEmptyRow, targetEmptyCol];
      const selectedEmptyGrid = targetedEmptyGrid(emptySqr, state.selectedSqr, state.gameGrid);
      return {
        ...state,
        gameGrid: selectedEmptyGrid,
        selectedSqr: [null, null],
        phaseTwo: false,
      }
    case TARGETED_PIECE:
      const [targetSqrRow, targetSqrCol] = action.payload.replace('sqr', '').split('-').map(n => Number(n));
      const selectedFilledSqr: SelectedSquare = [targetSqrRow, targetSqrCol];
      const selectedFilledGrid = targetedPieceGrid(selectedFilledSqr, state.selectedSqr, state.gameGrid);
      return {
        ...state,
        gameGrid: selectedFilledGrid,
        selectedSqr: [null, null],
        phaseTwo: false,
      }
    case FILLED_BENCHES:
      return {
        ...state,
      }
    case CLOSED_GAME:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default boardReducer