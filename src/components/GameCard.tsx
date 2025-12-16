import Link from "next/link";

interface GameCardProps {
  background: string;
  title: string;
  paragraph: string;
  gameLink: string;
}

const GameCard = ({background, title, paragraph, gameLink} : GameCardProps) => (
  <div className={`${background} h-[300px] p-6 bg-stone-900 rounded-3xl bg-center bg-cover flex flex-col w-[250px] grow shadow-xl/30`}>
    <h4 className="uppercase text-stone-200 tracking-[2px] text-2xl mb-4">{title}</h4>
    <p className="text-stone-200 text-xl">{paragraph}</p>
    <Link className="lowercase block bg-stone-200/70 hover:bg-stone-200/90 py-4 rounded-full text-center no-underline text-stone-800 text-xl tracking-[3px] mt-auto" href={`/${gameLink}`}>{gameLink === 'soon' ? 'coming soon' : 'new game'}</Link>
  </div>
);

export default GameCard;