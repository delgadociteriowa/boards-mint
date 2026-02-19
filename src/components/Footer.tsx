import Link from "next/link";

interface  FooterLink {
  text: string;
  href: string;
  className: string;
  target: string;
};

const Footer = () => {
  const linkClass = 'no-underline hover:text-stone-100 text-xl font-thin';
  const linkClassLower = linkClass + ' lowercase tracking-[3px]';
  const navLinks: FooterLink[] = [
    { text: '♞BOARDS', href: '/', className: 'no-underline hover:text-stone-100 font-brand text-3xl md:mr-auto', target: '_self'},
    { text: 'home', href: '/', className: linkClassLower, target: '_self' },
    { text: 'games', href: '/games', className: linkClassLower, target: '_self' },
    { text: 'about', href: '/about', className: linkClassLower, target: '_self' },
    { text: 'Privacy Policy', href: '/privacy', className: linkClass, target: '_self' },
    { text: 'Carlos Delgado 2026', href: 'https://delgadociteriowa.github.io/main/', className: linkClass, target: '_blank'},
  ];
  
  return (<footer className="bg-stone-800 text-stone-300">
    <nav className="w-[90%] mx-auto max-w-[1200px] py-14 flex flex-col gap-8 items-center md:flex-row">
      {navLinks.map(link => (
        <Link key={link.text} href={link.href} className={link.className} target={link.target}>{link.text}</Link>
      ))}
    </nav>
  </footer>)
};

export default Footer;