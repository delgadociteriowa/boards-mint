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
import formatDate from "@/utils/formatDate";

export const getBoard = createAsyncThunk<
  BoardStateType,   // returnsboard
  string,           // id
  { rejectValue: string }
>(
  "board/getBoard",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/board/get/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch board");
      }

      const data = await res.json();
      console.log("RAW API DATA:", data);
      return {
        ...data,
        id: data._id,
        owner: data.owner,
        selectedGame: data.selectedGame,
        gameGrid: data.gameGrid,
        createdAt: formatDate(data.createdAt),
        updatedAt: formatDate(data.updatedAt),
      };
    } catch (error) {
      return rejectWithValue("Error fetching board");
    }
  }
);

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
  deleteError: null,
  loading: false,
  loadError: null,
  createdAt: '',
  updatedAt: '',
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
      state.phaseTwo = false;
      state.deleting = false;
      state.deleteError = null;
      state.loading = false;
      state.loadError = null;
      state.createdAt = '';
      state.updatedAt = '';
    },
    resetLoad: (state) => {
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
      builder
      .addCase(getBoard.pending, (state) => {
        state.loading = true;
        state.loadError = null;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.owner = action.payload.owner;
        state.selectedGame = action.payload.selectedGame;
        state.gameGrid = action.payload.gameGrid;
        state.selectedSqr = action.payload.selectedSqr;
        state.phaseTwo = action.payload.phaseTwo;
        state.createdAt = action.payload.createdAt;
        state.updatedAt = action.payload.updatedAt;
      })
      .addCase(getBoard.rejected, (state, action) => {
        state.loading = false;
        state.loadError = action.payload ?? "Unknown error";
      })
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

export const { selectGame, selectPiece, closeGame, resetLoad } = boardSlice.actions;

export default boardSlice.reducer;