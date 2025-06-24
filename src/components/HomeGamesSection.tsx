import GameCard from "./GameCard";

const HomeGamesSection =() => (
  <section className="w-[90%] mx-auto max-w-[1200px] py-14 text-stone-600">
    <h3 className="text-center text-4xl tracking-[2px] mb-8">Play endless classics</h3>
    <div className="py-5 flex flex-wrap justify-start gap-10 w-[100%]">
      <GameCard
        background={'bg-game-chess'}
        title={'chess'}
        paragraph={'A strategic board game where two players move pieces to checkmate the opponent’s king.'}/>
      <GameCard
        background={'bg-game-checkers'}
        title={'checkers'}
        paragraph={'A board game where players jump over and capture the opponent’s pieces.'}/>
      <GameCard
        background={'bg-game-go'}
        title={'go'}
        paragraph={'An ancient strategy game where players place stones to control the largest area on the board.'}/>
      <GameCard
        background={'bg-game-backgammon'}
        title={'backgammon'}
        paragraph={'A board game for two players that combines luck with strategic knowledge.'}/>
    </div>
    <a href="#" className="block w-[15rem] bg-stone-300 hover:bg-stone-200 py-6 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px] mx-auto mt-4 shadow-lg">more games</a>
  </section>
);

export default HomeGamesSection;