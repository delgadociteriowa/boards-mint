"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SavedCard from "@/components/SavedCard";
import LoadingComponent from "@/components/LoadingComponent";
import formatDate from "@/utils/formatDate";


interface SavedBoard {
  _id: string;
  owner: string;
  selectedGame: string;
  createdAt: string;
  lastSave: string;
};

const Saved = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [boards, setBoards] = useState<SavedBoard[]>([]);
  const [loadingBoards, setLoadingBoards] = useState(true);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    setUserName(session?.user?.username ?? null);
  }, [status, session, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchBoards = async () => {
      try {
        const res = await fetch("/api/board/get");

        if (!res.ok) {
          throw new Error("Failed to fetch saved boards");
        }

        const data: SavedBoard[] = await res.json();
        setBoards(data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      } finally {
        setLoadingBoards(false);
      }
    };

    fetchBoards();
  }, [status]);

  const handleDelete = async (id: string): Promise<void> => {
    const confirmed = confirm("Are you sure you want to delete this saved game?");
    if (!confirmed) return;

    setLoadingBoards(true);

    try {
      const res = await fetch(`/api/board/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete board");
      }

      setBoards(prev =>
        prev.filter(board => board._id !== id)
      );
      setLoadingBoards(false);
    } catch (error) {
      console.error("Error deleting board:", error);
      alert("Something went wrong while deleting the saved game.");
      setLoadingBoards(false);
    }
  };

  return (
    <>
      <Header/>
        {(status === "loading" || loadingBoards) && <LoadingComponent />}
        <main className="min-h-[800px]">
          <section className="w-[90%] mx-auto max-w-[1200px] py-14 text-stone-600">
            <h3 className="text-center text-4xl tracking-[2px] mb-2">Saved Games</h3>
            <h4 className="text-center text-2xl tracking-[2px] mb-8">{userName}</h4>
            <div className="py-5 flex flex-wrap justify-start gap-10 w-[100%] mb-8">
              
              {!loadingBoards && boards.length === 0 && (
                <p className="text-center w-full">
                  No saved games yet.
                </p>
              )}
              {!loadingBoards &&
                boards.map(board => (
                  <SavedCard
                    key={board._id}
                    game={board.selectedGame}
                    gameId={board._id}
                    createdAt={formatDate(board.createdAt)}
                    lastSaved={formatDate(board.lastSave)}
                    handleDelete={handleDelete}
                  />
              ))}
            </div>
          </section>
        </main>
      <Footer/>
    </>
  );
}
export default Saved;