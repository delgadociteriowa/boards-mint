'use client';
import {
  buildSyncGrid,
  getBoard,
  selectPiece,
  setChangeFromSocket,
} from '@/state/board/boardSlice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Square } from '@/types/board';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const useBoard = () => {
  const searchParams = useSearchParams();
  const queryParamId = useRef(searchParams.get('id') || '').current;
  const router = useRouter();
  const { id, selectedGame, gameGrid, phaseTwo, loading, error } =
    useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  // Si no hay qpid hacer un board normal, cuando si hay lo pide.
  useEffect(() => {
    if (!queryParamId) {
      dispatch(buildSyncGrid());
    } else {
      dispatch(getBoard(queryParamId));
    }
  }, [queryParamId, selectedGame, dispatch]);

  // genera el queryparamid y lo coloca en el url
  useEffect(() => {
    if (!queryParamId && id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('id', id);
      router.replace(`?${params.toString()}`);
    }
  }, [queryParamId, id]);

  const handleClickSqr = (cell: Square) => {
    if (selectedGame === 'reversi' || selectedGame === 'tic-tac-toe') {
      dispatch(selectPiece(cell.id));
      dispatch(setChangeFromSocket(false));
      return;
    }

    if (!phaseTwo) {
      if (!cell.piece) return;
      dispatch(selectPiece(cell.id));
      dispatch(setChangeFromSocket(false));
      return;
    }
    dispatch(selectPiece(cell.id));
    dispatch(setChangeFromSocket(false));
  };

  return {
    queryParamId,
    selectedGame,
    gameGrid,
    phaseTwo,
    loading,
    error,
    handleClickSqr,
  };
};
