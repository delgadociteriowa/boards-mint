import { UserStateType, LoginState } from "../../types/user";
import { signIn } from "next-auth/react";

import {
  createSlice,
  PayloadAction,
  createAsyncThunk
} from "@reduxjs/toolkit";

export const login = createAsyncThunk<
  undefined,           
  LoginState,      
  { rejectValue: string }
>(
  "board/deleteBoard",
  async (LoginState, { rejectWithValue }) => {
    const {identifier, password} = LoginState;
    try {
      const res = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (!res || !res.ok) {
        throw new Error(`Login failed. Wrong username or password.`);
      }
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);

const initialState: UserStateType = {
  identifier: '',
  password: '',
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setIdentifier: (state, action: PayloadAction<string>) => {
      const trimIdentifier = action.payload.trim();
      state.identifier =  trimIdentifier;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      const trimPassword = action.payload.trim();
      state.password =  trimPassword;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.identifier = '';
        state.password = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
        state.identifier = '';
        state.password = '';
      })
  }
});

export const { setIdentifier, setPassword } = userSlice.actions;

export default userSlice.reducer;