'use client';

import Board from '@/components/board/Board';
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
      <Board />
      <Footer />
    </>
  );
};
export default Chess;
