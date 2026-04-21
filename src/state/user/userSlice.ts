import formatDate from '@/utils/formatDate';
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
  {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
  },
  SignUpState,
  { rejectValue: string }
>('user/signUp', async (SignUpState, { rejectWithValue }) => {
  const { email, username, firstName, lastName, password } = SignUpState;
  try {
    const res = await fetch(`/api/account/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        firstName,
        lastName,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message);
    }

    return {
      id: data._id,
      email: data.email,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      createdAt: formatDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
    };
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
  firstName: '',
  lastName: '',
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
    setFirstName: (state, action: PayloadAction<string>) => {
      const trimFirstName = action.payload.trim();
      state.firstName = trimFirstName;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      const trimLastName = action.payload.trim();
      state.lastName = trimLastName;
    },
    syncUserData: (state, action: PayloadAction<SyncUser>) => {
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
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
        state.firstName = '';
        state.lastName = '';
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
  setFirstName,
  setLastName,
  setEditingField,
} = userSlice.actions;

export default userSlice.reducer;
