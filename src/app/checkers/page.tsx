'use client';
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import { useGlobalContext } from "@/context/GlobalContext";

const Checkers: React.FC = () => {
  const { setSelectedGame, setGameGrid } = useGlobalContext()!;

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