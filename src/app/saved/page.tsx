"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SavedCard from "@/components/SavedCard";
import LoadingComponent from "@/components/LoadingComponent";

const Saved = () => {
  const [userName, setUserName] = useState<string | null>(null);

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

  if (status === "loading") {
    return (
      <>
        <Header/>
        <LoadingComponent/>
        <Footer/>
      </>
    );
  }

  return (
    <>
      <Header/>
        <main className="min-h-[800px]">
          <section className="w-[90%] mx-auto max-w-[1200px] py-14 text-stone-600">
            <h3 className="text-center text-4xl tracking-[2px] mb-2">Saved Games</h3>
            <h4 className="text-center text-2xl tracking-[2px] mb-8">{userName}</h4>
            <div className="py-5 flex flex-wrap justify-start gap-10 w-[100%] mb-8">
              <SavedCard
                background={'bg-game-chess'}
                title={'chess'}
                gameLink={'chess'}/>
              <SavedCard
                background={'bg-game-checkers'}
                title={'checkers'}
                gameLink={'checkers'}/>
              <SavedCard
                background={'bg-game-chess'}
                title={'chess'}
                gameLink={'chess'}/>
              <SavedCard
                background={'bg-game-checkers'}
                title={'checkers'}
                gameLink={'checkers'}/>
              <SavedCard
                background={'bg-game-checkers'}
                title={'checkers'}
                gameLink={'checkers'}/>
            </div>
          </section>
        </main>
      <Footer/>
    </>
  );
}
export default Saved;