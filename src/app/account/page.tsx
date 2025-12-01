"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface UserAccount {
  firstname?: string;
  lastname?: string;
}

interface SessionAccount {
  user?: UserAccount;
}

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editingFirst, setEditingFirst] = useState(false);
  const [editingLast, setEditingLast] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    const s = session as SessionAccount;

    if (s?.user) {
      setFirstName(s.user.firstname || "");
      setLastName(s.user.lastname || "");
    }
  }, [session]);

  return (
    <>
      <Header />
      <main>
        <h3 className="text-center text-stone-600 text-5xl tracking-[2px] mt-10 mb-4">
          Account
        </h3>
        <section className="w-[90%] mx-auto max-w-[500px] py-20 text-stone-700 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <label className="text-stone-600 tracking-[1px] text-sm">first name</label>
            <div className="flex items-center justify-between">
              {editingFirst ? (
                <input
                  className="border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              ) : (
                <p className="text-stone-700 text-lg">{firstName}</p>
              )}
              <button
                className="bg-sky-600 hover:bg-sky-500 text-stone-100 px-5 py-2 rounded-xl ml-4"
                onClick={() => setEditingFirst(!editingFirst)}
              >
                {editingFirst ? "save" : "edit"}
              </button>
            </div>
          </div>
          <div className="w-full h-px bg-stone-300"></div>
          <div className="flex flex-col gap-2">
            <label className="text-stone-600 tracking-[1px] text-sm">last name</label>
            <div className="flex items-center justify-between">
              {editingLast ? (
                <input
                  className="border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              ) : (
                <p className="text-stone-700 text-lg">{lastName}</p>
              )}
              <button
                className="bg-sky-600 hover:bg-sky-500 text-stone-100 px-5 py-2 rounded-xl ml-4"
                onClick={() => setEditingLast(!editingLast)}
              >
                {editingLast ? "save" : "edit"}
              </button>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-sky-600 hover:bg-sky-500 py-5 rounded-full text-center text-stone-100 text-lg tracking-[2px] mt-4 shadow-xl/20"
          >
            log out
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Account;
