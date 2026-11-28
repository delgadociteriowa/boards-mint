import formatDate from '@/utils/formatDate';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BoardStateType,
  Grid,
  ReversiPieceType,
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

export const addBoard = createAsyncThunk<
  {
    id: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
  }, //returned
  {
    gameGrid?: Grid;
    selectedGame: SelectedGame;
    reversiNextPiece?: ReversiPieceType;
  }, // received
  { rejectValue: string }
>(
  'board/addBoard',
  async ({ gameGrid, selectedGame, reversiNextPiece }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/board/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameGrid,
          selectedGame,
          reversiNextPiece,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create board');
      }

      const data = await res.json();

      return {
        id: data._id,
        owner: data.owner,
        createdAt: formatDate(data.createdAt),
        updatedAt: formatDate(data.updatedAt),
      };
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  },
);

export const getBoard = createAsyncThunk<
  BoardStateType, // returnsboard
  string, // id
  { rejectValue: string }
>('board/getBoard', async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/board/get/${id}`);

    if (!res.ok) {
      console.log(`Error. Response status: ${res.status}`);
      throw new Error(`Failed to fetch the selected board`);
    }

    const data = await res.json();
    console.log('RAW API DATA:', data);
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
    return rejectWithValue(`${error}`);
  }
});

export const updateBoard = createAsyncThunk<
  { updatedAt: string }, // return updated date
  {
    id: string;
    gameGrid: Grid;
    reversiNextPiece?: ReversiPieceType;
  }, // id, gameGrid
  { rejectValue: string }
>(
  'board/updateBoard',
  async ({ id, gameGrid, reversiNextPiece }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/board/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameGrid, reversiNextPiece }),
      });

      if (!res.ok) {
        throw new Error('Failed to update board');
      }

      const data = await res.json();

      return {
        updatedAt: formatDate(data.updatedAt),
      };
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  },
);

export const deleteBoard = createAsyncThunk<
  string, // deleted id
  string, // gets id
  { rejectValue: string }
>('board/deleteBoard', async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/board/delete/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.log(`Error. Response status: ${res.status}`);
      throw new Error('Failed to delete the board');
    }

    return id;
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

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
