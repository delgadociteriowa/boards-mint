import GameCard from "./GameCard";
import Link from "next/link";

const HomeGamesSection: React.FC = () => (
  <section className="w-[90%] mx-auto max-w-[1200px] py-14 text-stone-600">
    <h3 className="text-center text-4xl tracking-[2px] mb-8">Play Endless Classics</h3>
    <div className="py-5 flex flex-wrap justify-start gap-10 w-[100%] mb-8">
      <GameCard
        background={'bg-game-chess'}
        title={'chess'}
        paragraph={'A strategic board game where two players move pieces to checkmate the opponent’s king.'}
        gameLink={'chess'}/>
      <GameCard
        background={'bg-game-checkers'}
        title={'checkers'}
        paragraph={'A board game where players jump over and capture the opponent’s pieces.'}
        gameLink={'checkers'}/>
      <GameCard
        background={'bg-game-go'}
        title={'go'}
        paragraph={'A game where players place stones to control the largest area on the board.'}
        gameLink={'soon'}/>
      <GameCard
        background={'bg-game-backgammon'}
        title={'backgammon'}
        paragraph={'A board game for two players that combines luck with strategic knowledge.'}
        gameLink={'soon'}/>
    </div>
    <Link href="/games" className="block w-[15rem] bg-sky-600 hover:bg-sky-500 py-6 rounded-full text-center no-underline text-stone-100 text-xl lowercase tracking-[3px] mx-auto mt-4 shadow-xl/20">more games</Link>
    <p className="text-left text-stone-600 leading-relaxed w-[100%] mt-10 px-6">Boards is a totally free virtual board game app and a passion project. It is not affiliated with or endorsed by any trademark.</p>
    <p className="text-left text-stone-600 leading-relaxed w-[100%] mt-1 px-6">This site uses <a className="text-blue-600 hover:text-blue-500" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Web Analytics</a> to anonymously measure visits. No cookies are set, users are not identified or tracked. More information in <Link href="/privacy" className="text-blue-600 hover:text-blue-500 font-bold">privacy</Link>.</p>
  </section>
);

export default HomeGamesSection;