'use client';

import GameSet from '@/components/board/GameSet';
import { closeGame, selectGame } from '@/state/board/boardSlice';
import { useAppDispatch } from '@/state/hooks';
import { useEffect } from 'react';

const TicTacToe = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectGame('tic-tac-toe'));

    return () => {
      dispatch(closeGame());
    };
  }, [dispatch]);

  return <GameSet />;
};

export default TicTacToe;
