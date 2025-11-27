"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Account = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [userName, setUserName] = useState("johnboards");
  const [password, setPassword] = useState("123456");

  const [editingFirst, setEditingFirst] = useState(false);
  const [editingLast, setEditingLast] = useState(false);
  const [editingUserName, setEditingUserName] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  return (
    <>
      <Header />
      <main>
        <h3 className="text-center text-stone-600 text-5xl tracking-[2px] mt-10 mb-4">
          Account
        </h3>

        <section className="w-[90%] mx-auto max-w-[500px] py-20 text-stone-700 flex flex-col gap-10">
          {/* First Name */}
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
          
          {/* Last Name */}
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

          <div className="w-full h-px bg-stone-300"></div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-stone-600 tracking-[1px] text-sm">username</label>
            <div className="flex items-center justify-between">
              {editingUserName ? (
                <input
                  className="border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              ) : (
                <p className="text-stone-700 text-lg">{userName}</p>
              )}
              <button
                className="bg-sky-600 hover:bg-sky-500 text-stone-100 px-5 py-2 rounded-xl ml-4"
                onClick={() => setEditingUserName(!editingUserName)}
              >
                {editingUserName ? "save" : "edit"}
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-stone-300"></div>
          
          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-stone-600 tracking-[1px] text-sm">password</label>
            <div className="flex items-center justify-between">
              {editingPassword ? (
                <input
                  className="border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <p className="text-stone-700 text-lg">{"*".repeat(password.length)}</p>
              )}
              <button
                className="bg-sky-600 hover:bg-sky-500 text-stone-100 px-5 py-2 rounded-xl ml-4"
                onClick={() => setEditingPassword(!editingPassword)}
              >
                {editingPassword ? "save" : "edit"}
              </button>
            </div>
          </div>


        </section>
      </main>
      <Footer />
    </>
  );
};

export default Account;
