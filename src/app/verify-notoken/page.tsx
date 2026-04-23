import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import Error from '../../assets/error.svg';

const VerifyNoToken = () => {
  return (
    <>
      <Header />
      <main className='h-[800px]'>
        <section className='py-10 px-10 text-stone-600'>
          <h3 className='text-center text-4xl tracking-[2px] mt-10 mb-8'>
            Verification token not provided
          </h3>
          <p className='text-center text-xl mb-10'>
            The verification token has not been found.
          </p>
          <figure className='h-40 mx-0 my-16'>
            <Image
              src={Error}
              alt='Screen with error message image'
              className='block h-[100%] mx-auto my-0'
              width={500}
              height={500}
            />
          </figure>
          <Link
            href='/'
            className='block w-[15rem] bg-sky-600 hover:bg-sky-500 py-6 rounded-full text-center no-underline text-stone-100 text-xl lowercase tracking-[3px] mx-auto my-0 shadow-lg'
          >
            home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default VerifyNoToken;
