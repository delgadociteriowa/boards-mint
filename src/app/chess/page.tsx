'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";
import LoadingComponent from "@/components/LoadingComponent";
import { selectGame, loadGame, closeGame } from "@/state/board/boardSlice";
import { BoardStateType } from "@/state/board/boardTs";
import formatDate from "@/utils/formatDate";


const Chess = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  const dispatch = useDispatch();

  useEffect(() => {
    const initGame = async () => {
      try {
        if (gameId) {
          const res = await fetch(`/api/board/get/${gameId}`);

          if (!res.ok) {
            throw new Error("Failed to fetch the saved board");
          }
          const dataFromApi = await res.json();
          const data: BoardStateType = {
            ...dataFromApi,
            id: dataFromApi._id,
            lastSaved: formatDate(dataFromApi.lastSave)
          };
          dispatch(loadGame(data));
        } else {
          dispatch(selectGame("chess"));
        }
      } catch (error) {
        console.error("Error fetching board:", error);
      } finally {
        setLoading(false);
      }
    };

    initGame();

    return () => {
      dispatch(closeGame())
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, dispatch]);

  return (
    <>
      <Header/>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Octoboard />
      )}
      <Footer/>
    </>
  );
}
export default Chess;