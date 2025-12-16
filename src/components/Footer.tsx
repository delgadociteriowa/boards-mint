import Link from "next/link";

const Footer = () => (
  <footer className="bg-stone-800 text-stone-300">
    <nav className="w-[90%] mx-auto max-w-[1200px] py-14 flex flex-col gap-8 items-center md:flex-row">
      <Link href="/" className="no-underline hover:text-stone-100 font-brand text-3xl md:mr-auto">♞BOARDS</Link>
      <Link href="/" className="no-underline hover:text-stone-100 text-xl font-thin lowercase tracking-[3px]">home</Link>
      <Link href="/games" className="no-underline hover:text-stone-100 text-xl font-thin lowercase tracking-[3px]">games</Link>
      <Link href="/about" className="no-underline hover:text-stone-100 text-xl font-thin lowercase tracking-[3px]">about</Link>
      <Link href="/privacy" className="no-underline hover:text-stone-100 text-xl font-thin lowercase">Privacy Policy</Link>
      <Link href="https://delgadociteriowa.github.io/main/" target="_blank" className="no-underline hover:text-stone-100 text-xl font-thin tracking-[2px]">Carlos Delgado 2025</Link>
    </nav>
  </footer>
);

export default Footer;