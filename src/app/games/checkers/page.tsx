'use client';
import Board from '@/components/board/Board';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { closeGame, selectGame } from '@/state/board/boardSlice';
import { useAppDispatch } from '@/state/hooks';
import { useEffect } from 'react';

const Checkers = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(selectGame('checkers'));

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
export default Checkers;
