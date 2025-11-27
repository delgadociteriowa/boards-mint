import HomeHeroSection from "@/components/HomeHeroSection";
import HomeMainSection from "@/components/HomeMainSection";
import HomeMessageSection from "@/components/HomeMessageSection";
import HomeGamesSection from "@/components/HomeGamesSection";
import Footer from "@/components/Footer";
//import connectDB from "@/config/database";

const Home: React.FC = () => {
  //connectDB();
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
