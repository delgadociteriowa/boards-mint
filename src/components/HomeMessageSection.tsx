import Link from 'next/link';

const HomeMessageSection = () => (
  <section className='py-14 px-10 bg-stone-200 text-stone-600'>
    <h3 className='text-center text-4xl tracking-[1px] mb-8 text-stone-700'>
      Available to everyone
    </h3>
    <p className='text-center text-xl mb-6'>
      Boards is an easy and free platform with
      <br /> your favorite board games in a virtual version.
      <br />
      Just pick a game and let the fun begin.
    </p>
    <Link
      href='/about'
      className='block w-[10rem] bg-stone-100 hover:bg-stone-50 py-3 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px] mx-auto my-0 shadow-md'
    >
      about
    </Link>
  </section>
);

export default HomeMessageSection;
