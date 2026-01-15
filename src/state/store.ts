import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./board/boardSlice";
import savedBoardsReducer from "@/state/savedBoards/savedBoardsSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    savedBoards: savedBoardsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;