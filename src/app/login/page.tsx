"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";

const Login = () => {
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
            <LoginForm/>            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;