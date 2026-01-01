import {
  SELECTED_GAME,
  SELECTED_PIECE,
  TARGETED_SELF,
  TARGETED_EMPTY,
  TARGETED_PIECE,
  CLOSED_GAME,
} from '../types'

import { BoardStateType, BoardAction, SelectedSquare } from './boardTypes';

import {
  buildGameGrid,
  selectSqrGrid,
  targetedSelfGrid,
  targetedEmptyGrid,
  targetedPieceGrid,
  benchesAreFilled,
} from './boardSetup';

const boardReducer = (state: BoardStateType, action: BoardAction): BoardStateType => {
  switch(action.type) {
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

      if (benchesAreFilled(state.gameGrid)) {
        const unSelectGrid = targetedSelfGrid(state.selectedSqr, state.gameGrid);
        return {
          ...state,
          gameGrid: unSelectGrid,
          selectedSqr: [null, null],
          phaseTwo: false,
        }
      }
      return {
        ...state,
        gameGrid: selectedFilledGrid,
        selectedSqr: [null, null],
        phaseTwo: false,
      }
    case CLOSED_GAME:
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
}

export default boardReducer