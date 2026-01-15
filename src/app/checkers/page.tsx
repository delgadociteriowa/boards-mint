'use client';
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { selectGame, resetLoad } from "@/state/board/boardSlice";

const Checkers = () => {
  const dispatch = useAppDispatch();
  const boardId = useAppSelector(
    state => state.board.id
  );


  useEffect(() => {
    dispatch(resetLoad());
    if(boardId === ''){
      dispatch(selectGame('checkers'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <Header/>
      <Octoboard/>
      <Footer/>
    </>
  );
}
export default Checkers;