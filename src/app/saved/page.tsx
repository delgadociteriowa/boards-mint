"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingComponent from "@/components/LoadingComponent";
import SavedList from "@/components/SavedList";
import { useSavedBoards } from "../hooks/useSavedBoards";
import SectionTitle from "@/components/SectionTitle";

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
            <SectionTitle title="saved games"/>
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