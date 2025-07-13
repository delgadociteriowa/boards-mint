import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Soon: React.FC = () => {
  return (
    <>
      <Header/>
        <main>
          <section className="py-10 px-10 text-stone-600 mx-auto max-w-[1200px]">
            <h3 className="text-center text-4xl tracking-[2px] mt-10 mb-8">About</h3>
            <div className="bg-stone-50 px-14 py-16 rounded-3xl grow shadow-xl/30 my-7">
              <p className="text-left text-xl">Welcome to Boards, an easy and free platform with your favorite board games. No hassle, no sign-ups, just pick a game and let the fun begin.</p>
            </div>
            <div className="bg-stone-50 px-14 py-16 rounded-3xl grow shadow-xl/30 my-7">
              <p className="text-left text-xl">Boards is a simple and accessible virtual replacement for classic board games like chess or checkers, available from any device. Whether you're on a PC, laptop, tablet, or phone, you can start a new game in seconds.</p>
            </div>
            <div className="bg-stone-50 px-14 py-16 rounded-3xl grow shadow-xl/30 my-7">
              <p className="text-left text-xl">Boards has no limitations, so if you want to move a piece somewhere that goes against the rules, go ahead, just like in real life.    Boards gives you the tools to start a game, and the rest is up to you.</p>
            </div>
          </section>
        </main>
      <Footer/>
    </>
  );
}
export default Soon;