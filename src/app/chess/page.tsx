'use client';
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import { useGlobalContext } from "@/context/GlobalContext";

const Chess = () => {
  const { setSelectedGame } = useGlobalContext()!;

  useEffect(() => {
    setSelectedGame('chess');
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
export default Chess;