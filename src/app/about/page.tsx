import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutCard from "@/components/AboutCard";
import AboutImage from "@/components/AboutImage";
import AboutTop from "../../assets/about_1.jpg";
import AboutCenter from "../../assets/about_2.jpg";
import AboutBottom from "../../assets/about_3.jpg";
import Link from "next/link";

const About = () => {
  return (
    <>
      <Header/>
        <main>
          <h3 className="text-center text-stone-600 text-6xl tracking-[2px] mt-10 mb-4">About</h3>
          <section className="mx-auto max-w-[1200px] flex flex-wrap mb-10 mt-4">
            <AboutCard color="bg-teal-500" title="Welcome" paragraph={`Boards is an easy and free platform with\n your favorite board games in a virtual version.\nNo hassle, no sign-ups.\nJust pick a game and let the fun begin.`}/>
            <AboutImage image={AboutTop} alt="A chess board made of cristal"/>
            <AboutImage image={AboutCenter} alt="Laptop, tablet and phone floating in an empty space"/>
            <AboutCard color="bg-amber-400" title="Choose your Device" paragraph={`Here, you can find a simple and accessible virtual replacement for classic board games like chess or checkers, available from any device.\nWhether you're on a PC, laptop, tablet, or phone, you can start a new game in seconds.`}/>
            <AboutCard color="bg-violet-500" title="Make the Rules" paragraph={`The games have no limitations,\nso if you want to move a piece somewhere that goes against the rules, go ahead, just like in real life.\nBoards gives you the tools to start a game,\nand the rest is up to you.`}/>
            <AboutImage image={AboutBottom} alt="A robotic hand holding a chess piece"/>
            <p className="text-left text-stone-600 leading-relaxed w-[100%] mt-10 mx-6">Boards is a totally free virtual board game app and a passion project. It is not affiliated with or endorsed by any trademark.</p>
            <p className="text-left text-stone-600 leading-relaxed w-[100%] mt- mx-6">This site uses <a className="text-blue-600 hover:text-blue-500" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Web Analytics</a> to anonymously measure visits. No cookies are set, users are not identified or tracked. More information in <Link href="/privacy" className="text-blue-600 hover:text-blue-500 font-bold">privacy</Link>.</p>
            <p className="text-center text-xl text-stone-600 tracking-[2px] leading-relaxed w-[100%] mt-10">Boards v1.5.0</p>
          </section>
        </main>
      <Footer/>
    </>
  );
}
export default About;