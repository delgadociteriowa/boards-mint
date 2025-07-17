'use client';
import { useEffect, useContext } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import BoardContext from "@/context/board/boardContext";

const Checkers: React.FC = () => {
  const boardContext = useContext(BoardContext)!;
  const { selectGame, emptyGame } = boardContext;

  useEffect(() => {
    selectGame('checkers');
    return () => emptyGame();
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