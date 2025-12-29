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
  CLOSED_GAME,
} from '../types'

import { BoardStateType, BoardAction, SelectedSquare } from './boardTypes';

import { buildGameGrid, selectSqrGrid } from './boardSetup';

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
      return {
        ...state,
      }
    case TARGETED_EMPTY:
      return {
        ...state,
      }
    case TARGETED_PIECE:
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