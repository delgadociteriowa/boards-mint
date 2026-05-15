import Footer from '@/components/Footer';
import GameCardList from '@/components/GameCardList';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';

const Games = () => {
  const games = [
    {
      background: 'bg-game-chess',
      title: 'chess',
      paragraph: "Checkmate your opponent's king and master the game.",
      gameLink: 'chess',
    },
    {
      background: 'bg-game-checkers',
      title: 'checkers',
      paragraph: 'Jump over pieces to claim the board and win the game.',
      gameLink: 'checkers',
    },
    {
      background: 'bg-game-shogi',
      title: 'shogi',
      paragraph: 'Command armies of pieces to capture your opponent ones.',
      gameLink: 'soon',
    },
    {
      background: 'bg-game-go',
      title: 'go',
      paragraph: 'Place stones to control the largest area on the board.',
      gameLink: 'soon',
    },
    {
      background: 'bg-game-backgammon',
      title: 'backgammon',
      paragraph: "You'll need strategy and some luck to succeed in this game.",
      gameLink: 'soon',
    },
    {
      background: 'bg-game-reversi',
      title: 'reversi',
      paragraph: 'Flip your opponent pieces with strategy and logic.',
      gameLink: 'soon',
    },
    {
      background: 'bg-game-tic',
      title: 'tic-tac-toe',
      paragraph: 'Defeat your rivals by forming lines. A classic.',
      gameLink: 'soon',
    },
    {
      background: 'bg-game-mills',
      title: 'mills',
      paragraph:
        "A game played by the romans where you have to capture your opponent's soldiers.",
      gameLink: 'soon',
    },
  ];
  return (
    <>
      <Header />
      <main className='min-h-[800px]'>
        <section className='w-[90%] mx-auto max-w-[1200px] py-14 text-stone-600'>
          <SectionTitle title='games' />
          <GameCardList list={games} />
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Games;
