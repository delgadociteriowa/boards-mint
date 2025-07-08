'use client';
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import { useGlobalContext } from "@/context/GlobalContext";

const Checkers: React.FC = () => {
  const { setSelectedGame } = useGlobalContext()!;

  useEffect(() => {
    setSelectedGame('checkers');
    return () => {
      setSelectedGame('');
    };
  }, [setSelectedGame]);
  
  return (
    <>
      <Header/>
      <Octoboard/>
      <Footer/>
    </>
  );
}
export default Checkers;