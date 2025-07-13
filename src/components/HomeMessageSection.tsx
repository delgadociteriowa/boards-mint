import Link from "next/link";

const HomeMessageSection: React.FC = () => (
  <section className="py-14 px-10 bg-stone-200 text-stone-600">
    <h3 className="text-center text-4xl tracking-[2px] mb-8">Available to Everyone</h3>
    <p className="text-center text-xl mb-10">No registration required. Select a board and have fun.</p>
    <Link href="/about" className="block w-[15rem] bg-stone-100 hover:bg-stone-50 py-6 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px] mx-auto my-0 shadow-lg">about</Link>
  </section>
);

export default HomeMessageSection