import HomeGamesSection from '@/components/home/HomeGamesSection';
import HomeHeroSection from '@/components/home/HomeHeroSection';
import HomeMainSection from '@/components/home/HomeMainSection';
import HomeMessageSection from '@/components/home/HomeMessageSection';
import Footer from '@/components/layout/Footer';

const Home = () => {
  return (
    <>
      <HomeHeroSection />
      <HomeMainSection />
      <HomeMessageSection />
      <HomeGamesSection />
      <Footer />
    </>
  );
};

export default Home;
