import GameCard from "./GameCard";

interface GameCard {
  background: string;
  title: string;
  paragraph: string;
  gameLink: string;
}

interface GameCardListProp {
  list: GameCard[];
}

const GameCardList = ({list}: GameCardListProp) => {
  return (<div className="py-5 flex flex-wrap justify-start gap-10 w-[100%] mb-8">
    {list.map((card: GameCard) => (
      <GameCard
        key={card.title}
        background={card.background}
        title={card.title}
        paragraph={card.paragraph}
        gameLink={card.gameLink}/>
      ))
    }  
  </div>)
}

export default GameCardList;