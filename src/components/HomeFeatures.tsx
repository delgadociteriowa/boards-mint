import ChessIcon from "../assets/chess-board-solid.svg";
import FloppyIcon from "../assets/floppy-disk-regular.svg";
import MobileIcon from "../assets/mobile-screen-solid.svg";
import FeatureCard from "./FeatureCard";

const HomeFeatures: React.FC = () => (
    <section className="w-[90%] mt-8 mx-auto max-w-[1200px] pt-8 pb-14 text-stone-600">
      <h3 className="text-center text-4xl tracking-[2px] mb-8">Boards Makes it Easy</h3>
      <div className="py-5 flex flex-wrap justify-center gap-16">
        <FeatureCard
          icon={ChessIcon}
          altText={'Chess icon'}
          title={'No Restrictions'}
          paragraph={'Place the pieces wherever you want'}/>
        <FeatureCard
          icon={FloppyIcon}
          altText={'Floppy icon'}
          title={'Save Game'}
          paragraph={'Save your game and continue later'}/>
        <FeatureCard
          icon={MobileIcon}
          altText={'Mobile icon'}
          title={'Play Anywhere'}
          paragraph={'Play on mobile, tablet or desktop'}/>
      </div>
    </section>
);

export default HomeFeatures;