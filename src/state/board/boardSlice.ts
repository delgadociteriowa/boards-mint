import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BoardStateType,
  SelectedGame,
  SelectedSquare
} from "./boardTs";
import {
  buildGameGrid,
  selectSqrGrid,
  targetedSelfGrid,
  targetedEmptyGrid,
  targetedPieceGrid,
  benchesAreFilled
} from './boardSetup';

const initialState: BoardStateType = {
  id: '',
  owner: '',
  createdAt: '',
  lastSaved: '',
  selectedGame: '',
  gameGrid: [],
  selectedSqr: [null, null],
  phaseTwo: false
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers:{
    selectGame: (state, action: PayloadAction<SelectedGame>) => {
      const newGrid = buildGameGrid(action.payload);
      state.selectedGame =  action.payload;
      state.gameGrid = newGrid;
    },
    selectPiece: (state, action: PayloadAction<string>) => {
      const [row, col] = action.payload.replace('sqr', '').split('-').map(n => Number(n));
      const selectedPiece: SelectedSquare = [row, col];
      const isSameSqr = row === state.selectedSqr[0] && col === state.selectedSqr[1];
      const emptySqr: SelectedSquare = [null, null]; 

      if (!state.phaseTwo) {
        state.gameGrid = selectSqrGrid(selectedPiece, state.gameGrid);
        state.selectedSqr = selectedPiece;
        state.phaseTwo = true;
        return;
      }

      if (isSameSqr) {
        state.gameGrid = targetedSelfGrid(state.selectedSqr, state.gameGrid);
        state.selectedSqr = emptySqr;
        state.phaseTwo = false;
        return;
      }

      if (state.gameGrid[row][col].piece === '') {
        state.gameGrid = targetedEmptyGrid(selectedPiece, state.selectedSqr, state.gameGrid);
        state.selectedSqr = emptySqr;
        state.phaseTwo = false;
        return;
      }

      if (state.gameGrid[row][col].piece.length) {
        if (benchesAreFilled(state.gameGrid)) {
          state.gameGrid = targetedSelfGrid(state.selectedSqr, state.gameGrid);
        } else {
          state.gameGrid = targetedPieceGrid(selectedPiece, state.selectedSqr, state.gameGrid);
        }
        state.selectedSqr = emptySqr;
        state.phaseTwo = false;
        return;
      }
    },
    closeGame: (state) => {
      state.selectedGame = '';
      state.gameGrid = [];
      state.selectedSqr = [null, null];
      state.phaseTwo = false;
    }
  }
});

export const { selectGame, selectPiece, closeGame } = boardSlice.actions;

export default boardSlice.reducer;