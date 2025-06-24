import Link from 'next/link';
import Navigation from './Navigation';

const HomeHeroSection = () => (
  <header>
    <Navigation/>
    <section className="w-[90%] mx-auto max-w-[1200px] h-[85%] py-16 text-stone-200 bg-stone-900 bg-hero-chess bg-center bg-cover rounded-3xl flex flex-col gap-2">
      <h1 className="text-5xl text-center font-brand font-thin tracking-[2px]">BOARDS</h1>
      <div className="flex items-center gap-4 h-16 my-0 mx-auto">
        <div className="w-16 h-0.5 bg-stone-200"></div>
        <p className="text-4xl">♞</p>
        <div className="w-16 h-0.5 bg-stone-200"></div>
      </div>
      <h2 className="text-center text-xl w-[80%] my-0 mx-auto mb-4">Classic board games. Anywhere, anytime.</h2>
      <div className="flex flex-wrap justify-center gap-4 w-[100%]">
        <Link href="/chess" className="block w-[15rem] shrink bg-stone-200/70 hover:bg-stone-200/90 py-6 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px]">Play Now</Link>
        <Link href="/soon" className="block w-[15rem] shrink bg-stone-200/70 hover:bg-stone-200/90 py-6 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px]">About</Link>
      </div>
    </section>
  </header>
);

export default HomeHeroSection;