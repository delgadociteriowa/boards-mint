'use client';
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import { useGlobalContext } from "@/context/GlobalContext";

const Checkers = () => {
  const context = useGlobalContext();

  useEffect(() => {
    context?.setSelectedGame('checkers');
    return () => {
      context?.setSelectedGame('');
    };
  }, [context?.setSelectedGame]);
  
  return (
    <>
      <Header/>
      <Octoboard/>
      <Footer/>
    </>
  );
}
export default Checkers;