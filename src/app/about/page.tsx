import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import AboutTop from "../../assets/about_1.jpg";
import AboutCenter from "../../assets/about_2.jpg";
import AboutBottom from "../../assets/about_3.jpg";


const Soon: React.FC = () => {
  return (
    <>
      <Header/>
        <main>
          <h3 className="text-center text-stone-600 text-6xl tracking-[2px] mt-10 mb-4">About</h3>
          <section className="mx-auto max-w-[1200px] flex flex-wrap mb-10 mt-4">
            <div className="bg-teal-400 mx-5 px-14 py-16 rounded-3xl shadow-xl/30 my-10 max-w-[700px]">
              <h4 className="text-left text-5xl text-stone-50 mb-4">Welcome</h4>
              <p className="text-left text-xl text-stone-50 tracking-[2px] leading-relaxed">Boards is an easy and free platform with your favorite board games. No hassle, no sign-ups, just pick a game and let the fun begin.</p>
            </div>
            <div className="px-14 py-16 w-[400px] flex justify-center items-center grow">
              <Image src={AboutTop} alt="A chess board made of cristal" className="block h-[100%] mx-auto my-0 rounded-full shadow-xl/30" width={350} height={350}/>
            </div>
            <div className="px-14 py-16 w-[400px] flex justify-center items-center grow">
              <Image src={AboutCenter} alt="Laptop, tablet and phone floating in an empty space" className="block h-[100%] mx-auto my-0 rounded-full shadow-xl/30" width={350} height={350}/>
            </div>
            <div className="bg-amber-400 mx-5 px-14 py-16 rounded-3xl shadow-xl/30 my-10 max-w-[700px]">
              <h4 className="text-left text-5xl text-stone-50 mb-4 leading-14">Choose your Device</h4>
              <p className="text-left text-xl text-stone-50 tracking-[2px] leading-relaxed">Here, you can find a simple and accessible virtual replacement for classic board games like chess or checkers, available from any device. Whether you&apos;re on a PC, laptop, tablet, or phone, you can start a new game in seconds.</p>
            </div>
            <div className="bg-violet-400 mx-5 px-14 py-16 rounded-3xl shadow-xl/30 my-10 max-w-[700px]">
              <h4 className="text-left text-5xl text-stone-50 mb-4 leading-14">Make the Rules</h4>
              <p className="text-left text-xl text-stone-50 tracking-[2px] leading-relaxed">The games have no limitations, so if you want to move a piece somewhere that goes against the rules, go ahead, just like in real life. Boards gives you the tools to start a game, and the rest is up to you.</p>
            </div>
            <div className="px-14 py-16 w-[400px] flex justify-center items-center grow">
              <Image src={AboutBottom} alt="A robotic hand holding a chess piece" className="block h-[100%] mx-auto my-0 rounded-full shadow-xl/30" width={350} height={350}/>
            </div>
          </section>
        </main>
      <Footer/>
    </>
  );
}
export default Soon;