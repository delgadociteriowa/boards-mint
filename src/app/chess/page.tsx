'use client';

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import { useAppDispatch } from "@/state/hooks";
import { selectGame, closeGame } from "@/state/board/boardSlice";

const Chess = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectGame('chess'));
    
    return () => {
      dispatch(closeGame());
    };
  }, [dispatch])
  
  return (
    <>
      <Header/>
      <Octoboard/>
      <Footer/>
    </>
  );
}
export default Chess;