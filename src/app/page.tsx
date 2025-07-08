import HomeHeroSection from "@/components/HomeHeroSection";
import HomeMainSection from "@/components/HomeMainSection";
import HomeMessageSection from "@/components/HomeMessageSection";
import HomeGamesSection from "@/components/HomeGamesSection";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  return (
    <>
      <HomeHeroSection/>
      <HomeMainSection/>
      <HomeMessageSection/>
      <HomeGamesSection/>
      <Footer/>
    </>
  );
}
export default Home;
