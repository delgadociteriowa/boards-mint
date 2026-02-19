"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchSavedBoards } from "@/state/savedBoards/savedBoardsSlice";
import { deleteBoard } from "@/state/board/boardSlice";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";
import SavedCard from "@/components/SavedCard";
import LoadingComponent from "@/components/LoadingComponent";
import formatDate from "@/utils/formatDate";

const Saved = () => {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  const { boards, loading, error } = useAppSelector(state => state.savedBoards);

  useEffect(() => {
    if (status === "loading") return;
    dispatch(fetchSavedBoards());
  }, [status, dispatch]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
    "Are you sure you want to delete this board?"
    );

    if (!confirmed) return;
    
    await dispatch(deleteBoard(id));
    dispatch(fetchSavedBoards());
  };

  return (
    <>
      <Header />
      {(status === "loading") ?
        <LoadingComponent />
        :
        <main className="min-h-[800px]">
          <section className="w-[90%] mx-auto max-w-[1200px] py-14 text-stone-600">
            <h2 className="text-center text-4xl tracking-[2px] mb-10">
              Saved Games
            </h2>
            <div className="py-5 flex flex-wrap gap-10 w-full mb-8">
              {loading &&  (
                <Spinner />
              )}

              {!loading && status === "unauthenticated" && (
                <p className="text-center w-full">
                  Log in to save games
                </p>
              )}
              
              {!loading && boards.length === 0 && status === "authenticated" && (
                <p className="text-center w-full">
                  No saved games yet
                </p>
              )}
              
              {error && (
                <p className="text-center w-full text-red-500 text/xl">
                  {error}
                </p>
              )}

              {!loading &&
                boards.map(board => (
                  <SavedCard
                    key={board._id}
                    game={board.selectedGame}
                    gameId={board._id}
                    createdAt={formatDate(board.createdAt)}
                    lastSaved={formatDate(board.updatedAt)}
                    onDelete={handleDelete}
                  />
                ))}

            </div>
          </section>
        </main>
      }
      <Footer />
    </>
  );
};
export default Saved;