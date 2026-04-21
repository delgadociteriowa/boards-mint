import { signIn, signOut } from 'next-auth/react';
import {
  LoginState,
  SignUpState,
  SyncUser,
  UpdateUser,
  UserStateType,
} from '../../types/user';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const signUp = createAsyncThunk<
  void,
  SignUpState,
  { rejectValue: string }
>('user/signUp', async (SignUpState, { rejectWithValue }) => {
  const { email, username, firstname, lastname, password } = SignUpState;
  try {
    const res = await fetch(`/api/account/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        firstname,
        lastname,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message);
    }

    return;
  } catch (error) {
    return rejectWithValue('Unexpected error');
  }
});

export const login = createAsyncThunk<
  void,
  LoginState,
  { rejectValue: string }
>('user/login', async (LoginState, { rejectWithValue }) => {
  const { identifier, password } = LoginState;
  try {
    const res = await signIn('credentials', {
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
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await signOut({ redirect: false });

      if (!res || res.url === null) {
        throw new Error(`Logout failed.`);
      }
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  },
);

export const updateUser = createAsyncThunk<
  void,
  UpdateUser,
  { rejectValue: string }
>('user/update', async (UpdateUser, { rejectWithValue }) => {
  try {
    const res = await fetch('/api/account/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(UpdateUser),
    });
    if (!res) {
      throw new Error(`Update failed failed.`);
    }
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});

const initialState: UserStateType = {
  identifier: '',
  password: '',
  userName: '',
  email: '',
  firstname: '',
  lastname: '',
  editingField: null,
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIdentifier: (state, action: PayloadAction<string>) => {
      const trimIdentifier = action.payload.trim();
      state.identifier = trimIdentifier;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      const trimPassword = action.payload.trim();
      state.password = trimPassword;
    },
    clearError: (state) => {
      state.error = '';
    },
    setFirstname: (state, action: PayloadAction<string>) => {
      const trimFirstname = action.payload.trim();
      state.firstname = trimFirstname;
    },
    setLastname: (state, action: PayloadAction<string>) => {
      const trimLastname = action.payload.trim();
      state.lastname = trimLastname;
    },
    syncUserData: (state, action: PayloadAction<SyncUser>) => {
      state.userName = action.payload.userName;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
    },
    setEditingField: (
      state,
      action: PayloadAction<'firstname' | 'lastname' | null>,
    ) => {
      state.editingField = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // sign up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        alert('You have been signed up.');
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
        alert(`${state.error}`);
      })
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
        state.error = action.payload ?? 'Unknown error';
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.identifier = '';
        state.password = '';
        state.userName = '';
        state.email = '';
        state.firstname = '';
        state.lastname = '';
        state.editingField = null;
        state.loading = false;
        state.error = '';
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const {
  setIdentifier,
  setPassword,
  clearError,
  syncUserData,
  setFirstname,
  setLastname,
  setEditingField,
} = userSlice.actions;

export default userSlice.reducer;
