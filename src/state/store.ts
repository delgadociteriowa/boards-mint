import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./board/boardSlice";
import savedBoardsReducer from "@/state/savedBoards/savedBoardsSlice";
import userReducer from "@/state/user/userSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    savedBoards: savedBoardsReducer,
    user: userReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;