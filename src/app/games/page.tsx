import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameCardList from "@/components/GameCardList";

const Games = () => {
  const games = [
    { background: 'bg-game-chess', title: 'chess', paragraph: 'A strategic board game where two players move pieces to checkmate the opponent’s king.', gameLink: 'chess' },
    { background: 'bg-game-checkers', title: 'checkers', paragraph: 'A board game where players jump over and capture the opponent’s pieces.', gameLink: 'checkers' },
    { background: 'bg-game-go', title: 'go', paragraph: 'A game where players place stones to control the largest area on the board.', gameLink: 'soon' },
    { background: 'bg-game-backgammon', title: 'backgammon', paragraph: 'A board game for two players that combines luck with strategic knowledge.', gameLink: 'soon' },
    { background: 'bg-game-ludo', title: 'ludo', paragraph: 'A game where players move tokens home by rolling dice.', gameLink: 'soon' },
    { background: 'bg-game-gomoku', title: 'go-moku', paragraph: 'A strategy game where players aim to align five stones in a row.', gameLink: 'soon' },
    { background: 'bg-game-morris', title: 'morris', paragraph: 'Nine Men’s Morris is a strategy game forming mills to remove opponent’s pieces.', gameLink: 'soon' },
    { background: 'bg-game-snake', title: 'S & L', paragraph: 'A luck-based game about climbing ladders and avoiding sliding down snakes.', gameLink: 'soon' },
  ]
  return (
    <>
      <Header/>
        <main className="min-h-[800px]">
          <section className="w-[90%] mx-auto max-w-[1200px] py-14 text-stone-600">
            <h3 className="text-center text-4xl tracking-[2px] mb-8">Select a Game</h3>
            <GameCardList list={games}/>
          </section>
        </main>
      <Footer/>
    </>
  );
}
export default Games;