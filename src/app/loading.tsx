import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingComponent from "@/components/LoadingComponent";

const LoadingPage: React.FC = () => {
  return (
    <>
      <Header/>
      <LoadingComponent/>
      <Footer/>
    </>
  );
}
export default LoadingPage;