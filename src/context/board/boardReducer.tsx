import {
  SET_GAME,
  SET_GAME_GRID,
  SET_SELECTED_SQR,
  ACTIVATE_PHASE_TWO,
  DEACTIVATE_PHASE_TWO
} from '../types'

type BoardState = {
  selectedGame: string;
  gameGrid: Square[][];
  selectedSqr: [number | null, number | null];
  phaseTwo: boolean;
};

type BoardAction =
  | { type: typeof SET_GAME; payload: string }
  | { type: typeof SET_GAME_GRID; payload: Square[][] }
  | { type: typeof SET_SELECTED_SQR; payload: [number | null, number | null] }
  | { type: typeof ACTIVATE_PHASE_TWO }
  | { type: typeof DEACTIVATE_PHASE_TWO };

type Square = { 
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
};

const boardReducer = (state: BoardState, action: BoardAction) => {
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