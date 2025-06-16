import Link from 'next/link';
import Image from 'next/image';
import HamburguerIcon from '../assets/icon-hamburger.svg'
import CloseIcon from '../assets/icon-close.svg'

const HomeHeroSection = () => (
  <header>
    <nav id="nav" className="nav w-[90%] my-0 mx-auto max-w-[1200px] py-5 px-0 grid grid-cols-[max-content_max-content] justify-between">
      <a href="#" className="mr-auto font-brand text-3xl text-stone-600 no-underline z-40">♞BOARDS </a>
      <ul className="nav__links absolute bg-stone-200/90 inset-0 z-30 min-h-[500px] sm:min-h-[400px] py-0 pl-[5%] pr-0 grid gap-7 md:static md:min-h-0 md:p-0 md:bg-transparent md:grid-flow-col md:gap-[1em]">
        <li className="list-none">
          <Link href="#" className="text-stone-600 hover:text-stone-800 no-underline text-2xl lowercase tracking-[3px] ml-2.5 md:text-xl">home</Link>
        </li>
        <li className="list-none">
          <Link href="#" className="text-stone-700 hover:text-stone-800 no-underline text-2xl lowercase tracking-[3px] ml-2.5 md:text-xl">games</Link>
        </li>
        <li className="list-none">
          <Link href="#" className="text-stone-700 hover:text-stone-800 no-underline text-2xl lowercase tracking-[3px] ml-2.5 md:text-xl">about</Link>
        </li> 
      </ul>
      <a href="#" className="nav__close place-self-center cursor-pointer z-40">
        <Image src={CloseIcon} alt="Close icon" width={20} height={20} className="block w-5 h-5" /> 
      </a>
      <a href="#nav" className="nav__hamburguer place-self-center cursor-pointer z-40">
        <Image src={HamburguerIcon} alt="Menu icon" width={20} height={20} className="block w-5 h-5" /> 
      </a>
    </nav>
    <section className="w-[90%] mx-auto max-w-[1200px] h-[85%] py-16 text-stone-200 bg-stone-900 bg-hero-chess bg-center bg-cover rounded-3xl flex flex-col gap-2">
      <h1 className="text-5xl text-center font-brand font-thin tracking-[2px]">BOARDS</h1>
      <div className="flex items-center gap-4 h-16 my-0 mx-auto">
        <div className="w-16 h-0.5 bg-stone-200"></div>
        <p className="text-4xl">♞</p>
        <div className="w-16 h-0.5 bg-stone-200"></div>
      </div>
      <h2 className="text-center text-xl w-[80%] my-0 mx-auto mb-4">Classic board games. Anywhere, anytime.</h2>
      <div className="flex flex-wrap justify-center gap-4 w-[100%]">
        <Link href="#" className="block w-[15rem] shrink bg-stone-200/70 hover:bg-stone-200/90 py-6 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px]">Play Now</Link>
        <Link href="#" className="block w-[15rem] shrink bg-stone-200/70 hover:bg-stone-200/90 py-6 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px]">About</Link>
      </div>
    </section>
  </header>
);

export default HomeHeroSection;