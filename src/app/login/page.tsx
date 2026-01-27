"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/account");
    }
  }, [session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/account");
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h3 className="text-center text-stone-600 text-5xl tracking-[2px] mt-10 mb-4">
          Login
        </h3>

        <section className="w-[90%] mx-auto max-w-[500px] py-20 text-stone-700 mb-26">
          <form onSubmit={handleLogin} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                username / email
              </label>
              <input
                type="text"
                required
                value={identifier}
                disabled={loading}
                onChange={(e) => setIdentifier(e.target.value)}
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                password
              </label>
              <input
                type="password"
                required
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`py-5 rounded-full text-center text-stone-100 text-xl tracking-[2px] mx-auto mt-4 shadow-xl/20 w-[90%]
                ${loading 
                  ? "bg-stone-400 cursor-not-allowed" 
                  : "bg-sky-600 hover:bg-sky-500 cursor-pointer"}
              `}
            >
              {loading ? "loading..." : "login"}
            </button>
            <div className="w-full h-px bg-stone-300"></div>
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/account" })}
              disabled={loading}
              className={`py-5 rounded-full text-center text-stone-100 text-xl tracking-[2px] mx-auto shadow-xl/20 w-[90%]
                ${loading 
                  ? "bg-stone-400 cursor-not-allowed" 
                  : "bg-sky-600 hover:bg-sky-500 cursor-pointer"}
              `}
            >
              {loading ? "loading..." : "login/register with Google"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Login;