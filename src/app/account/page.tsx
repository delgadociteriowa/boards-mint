"use client";

import { useSession } from "next-auth/react";
import AccountSection from "@/components/AccountSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingComponent from "@/components/LoadingComponent";

const Account = () => {
  const { status } = useSession();

  return (
    <>
      <Header />
      {status === "loading" ? 
        <LoadingComponent />
        :
        <main>
          <h3 className="text-center text-stone-600 text-5xl tracking-[2px] mt-10 mb-4">
            Account
          </h3>
          <AccountSection />
        </main>
      }
      <Footer />
    </>
  );
};

export default Account;
