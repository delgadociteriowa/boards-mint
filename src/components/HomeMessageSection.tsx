import Link from "next/link";

const HomeMessageSection = () => (
  <section className="py-14 px-10 bg-stone-200 text-stone-600">
    <h3 className="text-center text-4xl tracking-[2px] mb-8">Register Now</h3>
    <p className="text-center text-xl mb-10">To continue your game in other devices and more...</p>
    <Link href="/soon" className="block w-[15rem] bg-stone-100 hover:bg-stone-50 py-6 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px] mx-auto my-0 shadow-lg">sign in</Link>
  </section>
);

export default HomeMessageSection