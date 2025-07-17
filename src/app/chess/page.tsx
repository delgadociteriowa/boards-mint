'use client';
import { useEffect, useContext } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import BoardContext from "@/context/board/boardContext";

const Chess: React.FC = () => {
  const boardContext = useContext(BoardContext)!;
  const { selectGame } = boardContext;

  useEffect(() => {
    selectGame('chess');
  }, [selectGame]);

  return (
    <>
      <Header/>
      <Octoboard/>
      <Footer/>
    </>
  );
}
export default Chess;