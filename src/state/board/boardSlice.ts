import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BoardStateType,
  Grid,
  SelectedGame,
  SelectedSquare,
} from '../../types/board';
import {
  benchesAreFilled,
  buildGameGrid,
  selectSqrGrid,
  targetedEmptyGrid,
  targetedPieceGrid,
  targetedSelfGrid,
} from './boardSetup';

import { addBoard, deleteBoard, getBoard, updateBoard } from './boardThunks';

const initialState: BoardStateType = {
  id: '',
  owner: '',
  selectedGame: '',
  gameGrid: [],
  selectedSqr: [null, null],
  phaseTwo: false,
  loading: false, //pending
  saving: false,
  error: null,
  createdAt: '',
  updatedAt: '',
  socketActive: false,
  shareDelay: false,
  socketHost: '',
  socketGuest: '',
  changeFromSocket: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    selectGame: (state, action: PayloadAction<SelectedGame>) => {
      state.selectedGame = action.payload;
    },
    buildSyncGrid: (state) => {
      const grid = buildGameGrid(state.selectedGame);
      state.gameGrid = grid;
    },
    flipPiece: (state, action: PayloadAction<string>) => {
      const [row, col] = action.payload
        .replace('sqr', '')
        .split('-')
        .map((n) => Number(n));
      const square = state.gameGrid[row]?.[col];

      if (square.piece === '') {
        square.piece = 'genericPiece';
        square.flipped = false;
        square.pieceType = !state.phaseTwo ? 'one' : 'two';
        state.phaseTwo = !state.phaseTwo;
      } else if (!square.flipped) {
        square.flipped = true;
        square.pieceType = square.pieceType === 'one' ? 'two' : 'one';
      } else {
        square.piece = '';
        square.pieceType = '';
        square.flipped = false;
        state.phaseTwo = false;
      }
    },
    movePiece: (state, action: PayloadAction<string>) => {
      const [row, col] = action.payload
        .replace('sqr', '')
        .split('-')
        .map(Number);

      const selectedPiece: SelectedSquare = [row, col];
      const currentSqr = state.selectedSqr;
      const emptySqr: SelectedSquare = [null, null];

      const isPhaseOne = !state.phaseTwo;
      const isSameSqr = row === currentSqr[0] && col === currentSqr[1];
      const hasPiece = state.gameGrid[row][col].piece !== '';

      if (isPhaseOne) {
        state.gameGrid = selectSqrGrid(selectedPiece, state.gameGrid);
        state.selectedSqr = selectedPiece;
        state.phaseTwo = true;
        return;
      }

      if (isSameSqr) {
        state.gameGrid = targetedSelfGrid(currentSqr, state.gameGrid);
      } else if (!hasPiece) {
        state.gameGrid = targetedEmptyGrid(
          selectedPiece,
          currentSqr,
          state.gameGrid,
        );
      } else if (benchesAreFilled(state.gameGrid)) {
        state.gameGrid = targetedSelfGrid(currentSqr, state.gameGrid);
      } else {
        state.gameGrid = targetedPieceGrid(
          selectedPiece,
          currentSqr,
          state.gameGrid,
        );
      }

      state.selectedSqr = emptySqr;
      state.phaseTwo = false;
    },
    setSelectedSqr: (state, action: PayloadAction<SelectedSquare>) => {
      state.selectedSqr = action.payload;
    },
    setGameGrid: (state, action: PayloadAction<Grid>) => {
      state.gameGrid = action.payload;
    },
    setPhaseTwo: (state, action: PayloadAction<boolean>) => {
      state.phaseTwo = action.payload;
    },
    setSocketActive: (state, action: PayloadAction<boolean>) => {
      state.socketActive = action.payload;
    },
    setShareDelay: (state, action: PayloadAction<boolean>) => {
      state.shareDelay = action.payload;
    },
    setSocketHost: (state, action: PayloadAction<string>) => {
      state.socketHost = action.payload;
    },
    setSocketGuest: (state, action: PayloadAction<string>) => {
      state.socketGuest = action.payload;
    },
    setChangeFromSocket: (state, action: PayloadAction<boolean>) => {
      state.changeFromSocket = action.payload;
    },
    closeGame: (state) => {
      state.selectedGame = '';
      state.id = '';
      state.gameGrid = [];
      state.selectedSqr = [null, null];
      state.phaseTwo = false;
      state.loading = false;
      state.saving = false;
      state.error = null;
      state.createdAt = '';
      state.updatedAt = '';
      state.socketActive = false;
      state.shareDelay = false;
      state.socketHost = '';
      state.socketGuest = '';
      state.changeFromSocket = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // getBoard
      .addCase(getBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.owner = action.payload.owner;
        state.selectedGame = action.payload.selectedGame;
        state.gameGrid = action.payload.gameGrid;
        state.createdAt = action.payload.createdAt;
        state.updatedAt = action.payload.updatedAt;
        state.loading = false;
      })
      .addCase(getBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      })
      // addBoard
      .addCase(addBoard.pending, (state) => {
        state.saving = true;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.owner = action.payload.owner;
        state.createdAt = action.payload.createdAt;
        state.updatedAt = action.payload.updatedAt;
        state.saving = false;
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload ?? 'Unknown error';
      })
      // updateBoard
      .addCase(updateBoard.pending, (state) => {
        state.saving = true;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.updatedAt = action.payload.updatedAt;
        state.saving = false;
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload ?? 'Unknown error';
      })
      // deleteBoard
      .addCase(deleteBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const {
  selectGame,
  buildSyncGrid,
  flipPiece,
  movePiece,
  closeGame,
  setSocketActive,
  setShareDelay,
  setSocketHost,
  setSocketGuest,
  setGameGrid,
  setChangeFromSocket,
  setPhaseTwo,
  setSelectedSqr,
} = boardSlice.actions;

export default boardSlice.reducer;
