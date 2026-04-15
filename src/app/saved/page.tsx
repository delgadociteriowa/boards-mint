"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingComponent from "@/components/LoadingComponent";
import SavedList from "@/components/SavedList";
import { useSavedBoards } from "../hooks/useSavedBoards";

const Saved = () => {
  const { boards, loading, error, status, handleDelete } = useSavedBoards();
  return (
    <>
      <Header />
      {(status === "loading") ?
        <LoadingComponent />
        :
        <main className="min-h-[800px]">
          <section className="w-[90%] mx-auto max-w-[1200px] py-14 text-stone-600">
            <h2 className="text-3xl ml-4 tracking-[2px] mb-2">
              saved games
            </h2>
            <div className="w-full h-px bg-stone-300"></div>
            <SavedList
              loading={loading}
              error={error}
              boards={boards}
              status={status}
              handleDelete={handleDelete} />
          </section>
        </main>
      }
      <Footer />
    </>
  );
};
export default Saved;