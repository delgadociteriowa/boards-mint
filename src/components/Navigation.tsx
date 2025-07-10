'use client';
import Link from 'next/link';
import Image from 'next/image';
import HamburguerIcon from '../assets/icon-hamburger.svg'
import CloseIcon from '../assets/icon-close.svg'
import { useGlobalContext } from '@/context/GlobalContext';

const Navigation: React.FC = () => {
  const { selectedGame } = useGlobalContext()!;
  return (
    <nav id="nav" className="nav w-[90%] my-0 mx-auto max-w-[1200px] py-5 px-0 grid grid-cols-[max-content_max-content] justify-between">
      <Link href="/" className="mr-auto font-brand text-3xl text-stone-600 no-underline z-40">♞BOARDS <span className="inline font-texts ml-2 uppercase tracking-[2px] text-stone-600 text-[1rem] font-bold">{selectedGame}</span></Link>
      <ul className="nav__links absolute bg-stone-200/90 inset-0 z-30 min-h-[500px] sm:min-h-[400px] py-0 pl-[5%] pr-0 grid gap-7 md:static md:min-h-0 md:p-0 md:bg-transparent md:grid-flow-col md:gap-[1em]">
        <li className="list-none">
          <Link href="/" className="text-stone-600 hover:text-stone-800 no-underline text-2xl lowercase tracking-[3px] ml-2.5 md:text-xl">home</Link>
        </li>
        <li className="list-none">
          <Link href="/soon" className="text-stone-700 hover:text-stone-800 no-underline text-2xl lowercase tracking-[3px] ml-2.5 md:text-xl">games</Link>
        </li>
        <li className="list-none">
          <Link href="/soon" className="text-stone-700 hover:text-stone-800 no-underline text-2xl lowercase tracking-[3px] ml-2.5 md:text-xl">about</Link>
        </li>
      </ul>
      <a href="#" className="nav__close place-self-center cursor-pointer z-40">
        <Image src={CloseIcon} alt="Close icon" width={20} height={20} className="block w-5 h-5" /> 
      </a>
      <a href="#nav" className="nav__hamburguer place-self-center cursor-pointer z-40">
        <Image src={HamburguerIcon} alt="Menu icon" width={20} height={20} className="block w-5 h-5" /> 
      </a>
    </nav>
)};

export default Navigation;