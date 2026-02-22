"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { setIdentifier, setPassword, login } from "@/state/user/userSlice";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";

const Login = () => {
  const dispatch = useAppDispatch();
  const { identifier, password, loading, error }  = useAppSelector(state => state.user);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/account");
    }
  }, [session, router]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({identifier, password}));
  };

  return (
    <>
      <Header />
      <main>
        <section className="text-stone-700 mt-8 md:mt-34 mb-20 md:mb-40">
          <div className="flex flex-col md:flex-row gap-12 md:w-[60%] w-[90%] mx-auto">
            <div className="flex-1 text-stone-200 p-8 rounded-3xl bg-teal-700 hidden md:block">
              <h2 className="text-4xl font-brand font-thin tracking-[2px]">♞BOARDS</h2>
              <div className="w-full h-px mt-2 mb-6 bg-stone-300"></div>
              <p className="text-lg leading-relaxed ml-4 text-stone-100/90">
                Welcome to Boards, a platform designed to make classic board games
                accessible to everyone.
              </p>
              <p className="text-lg leading-relaxed ml-4 mt-3 text-stone-100/80">
                Sign up to save your games and continue playing whenever
                you want.
              </p>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-8 flex-1">
              <div className="flex flex-col gap-2">
                <label className="text-stone-600 tracking-[1px] text-sm">
                  username / email
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  disabled={loading}
                  onChange={(e) => dispatch(setIdentifier(e.target.value))}
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
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                  className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <p className="text-red-500 h-2 text-center">{error}</p>
              {!loading ? 
                <>
                  <button
                    type="submit"
                    disabled={loading}
                    className="py-5 rounded-full text-center text-stone-100 text-xl tracking-[2px] shadow-xl/20 w-[60%] mx-auto bg-sky-600 hover:bg-sky-500 cursor-pointer"
                  >
                    login
                  </button>
                  <div className="w-full h-px bg-stone-300"></div>
                  <button
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/account" })}
                    disabled={loading}
                    className="py-5 rounded-full text-center text-stone-100 text-xl tracking-[2px] shadow-xl/20 w-[60%] mx-auto bg-sky-600 hover:bg-sky-500 cursor-pointer"
                  >
                    {loading ? "loading..." : "sign up with Google"}
                  </button>
                </>
                :
                <Spinner />
              }
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;