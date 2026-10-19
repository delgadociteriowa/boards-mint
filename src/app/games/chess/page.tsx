'use client';

import GameSet from '@/components/board/GameSet';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { closeGame, selectGame } from '@/state/board/boardSlice';
import { useAppDispatch } from '@/state/hooks';
import { useEffect } from 'react';

const Chess = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectGame('chess'));

    return () => {
      dispatch(closeGame());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <GameSet />
      <Footer />
    </>
  );
};
export default Chess;
