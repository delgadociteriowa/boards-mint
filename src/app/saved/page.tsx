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
            <h2 className="text-center text-4xl tracking-[2px] mb-10">
              Saved Games
            </h2>
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