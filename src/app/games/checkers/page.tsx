'use client';
import Octoboard from '@/components/board/Octoboard';
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
      <Octoboard />
      <Footer />
    </>
  );
};
export default Checkers;
