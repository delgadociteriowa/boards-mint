'use client';
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import { useGlobalContext } from "@/context/GlobalContext";

const Chess: React.FC = () => {
  const { setSelectedGame, setGameGrid } = useGlobalContext()!;

  useEffect(() => {
    setSelectedGame('chess');
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
export default Chess;