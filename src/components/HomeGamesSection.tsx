import GameCard from "./GameCard";
import Link from "next/link";

const HomeGamesSection: React.FC = () => (
  <section className="w-[90%] mx-auto max-w-[1200px] py-14 text-stone-600">
    <h3 className="text-center text-4xl tracking-[2px] mb-8">Play endless classics</h3>
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
        paragraph={'An ancient strategy game where players place stones to control the largest area on the board.'}
        gameLink={'soon'}/>
      <GameCard
        background={'bg-game-backgammon'}
        title={'backgammon'}
        paragraph={'A board game for two players that combines luck with strategic knowledge.'}
        gameLink={'soon'}/>
    </div>
    <Link href="/soon" className="block w-[15rem] bg-stone-300 hover:bg-stone-200 py-6 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px] mx-auto mt-4 shadow-lg">more games</Link>
  </section>
);

export default HomeGamesSection;