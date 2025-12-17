import {
  SET_GAME,
  SET_GAME_GRID,
  SET_SELECTED_SQR,
  ACTIVATE_PHASE_TWO,
  DEACTIVATE_PHASE_TWO
} from '../types'

import { BoardStateType, BoardAction } from './boardTypes';

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
    default:
      return state;
  }
}

export default boardReducer