import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import Link from 'next/link';
import Construction from '../../../assets/construction.svg';

const Soon = () => {
  return (
    <>
      <Header />
      <main className='h-200'>
        <section className='py-10 px-10 text-stone-600'>
          <h3 className='text-center text-4xl tracking-[2px] mt-10 mb-8'>
            Coming Soon
          </h3>
          <p className='text-center text-xl mb-10'>
            This page is under construction.
          </p>
          <figure className='h-40 mx-0 my-16'>
            <Image
              src={Construction}
              alt='Under construction image'
              className='block h-full mx-auto my-0'
              width={500}
              height={500}
            />
          </figure>
          <Link
            href='/games'
            className='block w-60 bg-stone-300 hover:bg-stone-200 py-6 rounded-full text-center no-underline text-stone-800 text-xl lowercase tracking-[3px] mx-auto my-0 shadow-lg'
          >
            games
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Soon;
