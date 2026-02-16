import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Notfound from "../assets/notfound.svg";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <Header/>
        <main className="h-[800px]">
          <section className="py-10 px-10 text-stone-600">
            <h3 className="text-center text-4xl tracking-[2px] mt-10 mb-8">Not Found</h3>
            <p className="text-center text-xl mb-10">Sorry, the page you are trying to reach hasn&apos;t been found.</p>
            <figure className="h-40 mx-0 my-16">
              <Image src={Notfound} alt="Not found 404 code image" className="block h-[100%] mx-auto my-0" width={500} height={500}/>
            </figure>
            <Link href="/" className="block w-[15rem] bg-stone-300 hover:bg-stone-200 py-6 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px] mx-auto my-0 shadow-lg">Home</Link>
          </section>
        </main>
      <Footer/>
    </>
  );
};

export default NotFoundPage;