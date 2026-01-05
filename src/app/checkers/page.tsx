'use client';
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import { useDispatch } from "react-redux";
import { selectGame, closeGame } from "@/redux/board/boardActions";

const Checkers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectGame('checkers'));
    return () => {
      dispatch(closeGame())
    };
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
export default Checkers;