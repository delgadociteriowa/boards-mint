import { UserStateType, LoginState, SyncSession } from "../../types/user";
import { signIn, signOut } from "next-auth/react";

import {
  createSlice,
  PayloadAction,
  createAsyncThunk
} from "@reduxjs/toolkit";

export const login = createAsyncThunk<
  void,           
  LoginState,      
  { rejectValue: string }
>(
  "user/login",
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

export const logout = createAsyncThunk<
  void,           
  void,      
  { rejectValue: string }
>(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await signOut({ redirect: false });
      
      if (!res || res.url === null) {
        throw new Error(`Logout failed.`);
      }
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);

const initialState: UserStateType = {
  identifier: '',
  password: '',
  userName: '',
  email: '',
  firstName: '',
  lastName: '',
  editingFirst: false,
  editingLast: false,
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
    syncSessionToState: (state, action: PayloadAction<SyncSession>) => {
      state.userName = action.payload.userName; 
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
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
      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.identifier =  '';
        state.password =  '';
        state.userName =  '';
        state.email =  '';
        state.firstName =  '';
        state.lastName =  '';
        state.editingFirst =  false;
        state.editingLast =  false;
        state.loading =  false;
        state.error =  '';
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })
  }
});

export const { setIdentifier, setPassword } = userSlice.actions;

export default userSlice.reducer;