import HomeGamesSection from '@/components/home/HomeGamesSection';
import HomeHeroSection from '@/components/home/HomeHeroSection';
import HomeMainSection from '@/components/home/HomeMainSection';
import HomeMessageSection from '@/components/home/HomeMessageSection';

const Home = () => {
  return (
    <>
      <HomeHeroSection />
      <HomeMainSection />
      <HomeMessageSection />
      <HomeGamesSection />
    </>
  );
};

export default Home;
