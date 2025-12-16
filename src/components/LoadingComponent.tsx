
import Image from "next/image";
import Loading from "../assets/loading.svg";

const LoadingComponent = () => (
  <main className="h-[800px]">
    <section className="py-10 px-10 text-stone-600">
      <h3 className="text-center text-4xl tracking-[2px] mt-10 mb-8">Loading</h3>
      <figure className="h-40 mx-0 my-16">
        <Image src={Loading} alt="Not found 404 code image" className="block h-[100%] mx-auto my-0" width={500} height={500}/>
      </figure>
    </section>
  </main>
);

export default LoadingComponent;