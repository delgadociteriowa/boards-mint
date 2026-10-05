'use client';

import { useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Octoboard from '@/components/Octoboard';
import { useAppDispatch } from '@/state/hooks';
import { closeGame, selectGame } from '@/state/board/boardSlice';

const TicTacToe = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectGame('tic-tac-toe'));

    return () => {
      dispatch(closeGame());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Octoboard />
      <Footer />
    </>
  );
};

export default TicTacToe;
