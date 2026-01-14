import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SavedBoard, SavedBoardsState } from "@/types/savedBoards";

const initialState: SavedBoardsState = {
  boards: [],
  loading: false,
  error: null
};

export const fetchSavedBoards = createAsyncThunk(
  "savedBoards/fetchSavedBoards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/board/get");

      if (!res.ok) {
        throw new Error("Failed to fetch saved boards");
      }

      return (await res.json()) as SavedBoard[];
    } catch (error) {
      return rejectWithValue("Error fetching saved boards");
    }
  }
);

const savedBoardsSlice = createSlice({
  name: "savedBoards",
  initialState,
  reducers: {
    clearSavedBoards: (state) => {
      state.boards = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.loading = false;
      })
      .addCase(fetchSavedBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearSavedBoards } = savedBoardsSlice.actions;
export default savedBoardsSlice.reducer;