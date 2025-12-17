"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <>
      <Header />
      <main>
        <h3 className="text-center text-stone-600 text-5xl tracking-[2px] mt-10 mb-4">
          Sign Up
        </h3>
        <section className="w-[90%] mx-auto max-w-[500px] py-20 text-stone-700">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                first name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                last name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
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
            <div className="flex flex-col gap-2">
              <label className="text-stone-600 tracking-[1px] text-sm">
                repeat password
              </label>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              className="bg-sky-600 hover:bg-sky-500 py-5 rounded-full text-center text-stone-100 text-lg tracking-[2px] mt-4 shadow-xl/20"
            >
              sign up
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;
