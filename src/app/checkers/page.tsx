import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Octoboard from "@/components/Octoboard";

const Checkers = () => {
  return (
    <>
      <Header/>
      <Octoboard selectedGame={'checkers'}/>
      <Footer/>
    </>
  );
}
export default Checkers;