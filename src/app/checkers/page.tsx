'use client';
import { useEffect, useContext } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import BoardContext from "@/context/board/boardContext";

const Checkers: React.FC = () => {
  const boardContext = useContext(BoardContext)!;
  const { setSelectedGame, setGameGrid } = boardContext;

  useEffect(() => {
    setSelectedGame('checkers');
    return () => {
      setSelectedGame('');
      setGameGrid([]);
    };
  }, [setSelectedGame, setGameGrid]);
  
  return (
    <>
      <Header/>
      <Octoboard/>
      <Footer/>
    </>
  );
}
export default Checkers;