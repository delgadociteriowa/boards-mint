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
          <AccountSection />
        </main>
      }
      <Footer />
    </>
  );
};

export default Account;
