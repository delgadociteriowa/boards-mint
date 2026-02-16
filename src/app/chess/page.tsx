'use client';
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { selectGame } from "@/state/board/boardSlice";

const Chess = () => {
  const dispatch = useAppDispatch();
  const boardId = useAppSelector(
    state => state.board.id
  );

  useEffect(() => {
    if(boardId === ''){
      dispatch(selectGame('chess'));
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
export default Chess;