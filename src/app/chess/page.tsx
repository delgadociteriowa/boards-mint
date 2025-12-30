'use client';
import { useEffect, useContext } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import BoardContext from "@/context/board/boardContext";

const Chess = () => {
  const boardContext = useContext(BoardContext)!;
  const { handleGameSelection, handleExitGame } = boardContext;

  useEffect(() => {
    handleGameSelection('chess');
    return () => handleExitGame();
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