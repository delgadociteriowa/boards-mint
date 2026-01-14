"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchSavedBoards } from "@/state/savedBoards/savedBoardsSlice";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SavedCard from "@/components/SavedCard";
import LoadingComponent from "@/components/LoadingComponent";
import formatDate from "@/utils/formatDate";

const Saved = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { boards, loading } = useAppSelector(
    state => state.savedBoards
  );

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    dispatch(fetchSavedBoards());
  }, [status, dispatch, router]);

  return (
    <>
      <Header />
      {(status === "loading" || loading) && <LoadingComponent />}
      <main className="min-h-[800px]">
        <section className="w-[90%] mx-auto max-w-[1200px] py-14 text-stone-600">
          <h3 className="text-center text-4xl tracking-[2px] mb-2">
            Saved Games
          </h3>
          <h4 className="text-center text-2xl tracking-[2px] mb-8">
            {session?.user?.username}
          </h4>

          <div className="py-5 flex flex-wrap gap-10 w-full mb-8">
            {!loading && boards.length === 0 && (
              <p className="text-center w-full">
                No saved games yet.
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
                />
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Saved;