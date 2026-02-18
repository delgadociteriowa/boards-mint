import ChessIcon from "../assets/chess-board-solid.svg";
import MobileIcon from "../assets/mobile-screen-solid.svg";
import HandHeartIcon from "../assets/hand-holding-heart-solid.svg"
import FeatureCard from "./FeatureCard";

interface Feature {
  icon: string;
  altText: string;
  title: string;
  paragraph: string;
};

const HomeFeatures = () => {
  const features: Feature[] = [
    { icon: ChessIcon, altText: 'Chess icon', title: 'No Restrictions', paragraph: 'Place the pieces wherever you want'},
    { icon: HandHeartIcon, altText: 'A hand holding a heart icon', title: 'Totally Free', paragraph: 'No subscriptions, no payments, no ads'},
    { icon: MobileIcon, altText: 'Mobile icon', title: 'Play Anywhere', paragraph: 'Play on mobile, tablet or desktop'},
  ];

  return(<section className="w-[90%] mt-8 mx-auto max-w-[1200px] pt-8 pb-14 text-stone-600 appear__main__element">
      <h3 className="text-center text-4xl tracking-[2px] mb-8">Boards Makes it Easy</h3>
      <div className="py-5 flex flex-wrap justify-center gap-16">
        {features.map(feature => (
          <FeatureCard
            key={feature.altText}
            icon={feature.icon}
            altText={feature.altText}
            title={feature.title}
            paragraph={feature.paragraph}/>
          ))
        }
      </div>
    </section>)
};

export default HomeFeatures;