"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/account");
    }
  }, [session, router]);

  const handleLogin = async () => {
     const res = await signIn("credentials", {
      username: userName,
      password: password,
      redirect: false,
    });

    if (res?.ok) router.push("/account");
  };
  
  return (
    <>
      <Header />
      <main>
        <h3 className="text-center text-stone-600 text-5xl tracking-[2px] mt-10 mb-4">
          Login
        </h3>
        <section className="w-[90%] mx-auto max-w-[500px] py-20 text-stone-700 mb-40">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                username
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              onClick={handleLogin}
              className="bg-sky-600 hover:bg-sky-500 py-5 rounded-full text-center text-stone-100 text-lg tracking-[2px] mt-4 shadow-xl/20"
            >
              login
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;
