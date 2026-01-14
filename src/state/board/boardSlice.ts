import {
  createSlice,
  PayloadAction,
  createAsyncThunk
} from "@reduxjs/toolkit";
import {
  BoardStateType,
  SelectedGame,
  SelectedSquare
} from "../../types/board";
import {
  buildGameGrid,
  selectSqrGrid,
  targetedSelfGrid,
  targetedEmptyGrid,
  targetedPieceGrid,
  benchesAreFilled
} from './boardSetup';

export const deleteBoard = createAsyncThunk<
  string,           // deleted id
  string,           // gets id
  { rejectValue: string }
>(
  "board/deleteBoard",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/board/delete/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error("Failed to delete board");
      }

      return id;
    } catch (error) {
      return rejectWithValue("Error deleting board");
    }
  }
);

const initialState: BoardStateType = {
  id: '',
  owner: '',
  selectedGame: '',
  gameGrid: [],
  selectedSqr: [null, null],
  phaseTwo: false,
  deleting: false,
  deleteError: null
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
    loadGame: (state, action: PayloadAction<BoardStateType>) => {
      const {id, owner, selectedGame, gameGrid} = action.payload;
      state.id = id;
      state.owner = owner;
      state.selectedGame = selectedGame;
      state.gameGrid = gameGrid;
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
      state.phaseTwo = false;
      state.deleteError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteBoard.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.deleting = false;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload ?? "Unknown error";
      });
  }
});

export const { selectGame, loadGame, selectPiece, closeGame } = boardSlice.actions;

export default boardSlice.reducer;