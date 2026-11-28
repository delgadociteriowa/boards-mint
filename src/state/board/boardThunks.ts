import formatDate from '@/utils/formatDate';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { BoardStateType, Grid, SelectedGame } from '../../types/board';

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
  }, // received
  { rejectValue: string }
>('board/addBoard', async ({ gameGrid, selectedGame }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/board/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameGrid,
        selectedGame,
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
});

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
  }, // id, gameGrid
  { rejectValue: string }
>('board/updateBoard', async ({ id, gameGrid }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/board/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameGrid }),
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
});

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
