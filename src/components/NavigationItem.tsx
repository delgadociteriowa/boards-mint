import Link from "next/link";

interface NavigationItemProps {
  href: string;
  color: string;
  text: string;
};

const NavigationItem = ({href, color, text}: NavigationItemProps) => {
  const linkStyle = 'no-underline text-2xl lowercase tracking-[3px] ml-2.5 md:text-xl'; 
  return  (
    <li className="list-none">
      <Link href={href} className={`${color} ${linkStyle}`}>{text}</Link>
    </li>
  )
}

export default NavigationItem;