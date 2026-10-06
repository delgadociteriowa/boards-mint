import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import Link from 'next/link';
import VerifiedImg from '../../assets/verified.svg';

const Verified = () => {
  return (
    <>
      <Header />
      <main className='h-200'>
        <section className='py-10 px-10 text-stone-600'>
          <h3 className='text-center text-4xl tracking-[2px] mt-10 mb-8'>
            Account Verified
          </h3>
          <p className='text-center text-xl mb-10'>
            Your account has been verified successfully.
            <br /> Welcome to Boards. Now you can sign in to save your games
            <br /> and to start online rooms to play with your friends.
          </p>
          <figure className='h-40 mx-0 my-16'>
            <Image
              src={VerifiedImg}
              alt='Laptop with success message image'
              className='block h-full mx-auto my-0'
              width={500}
              height={500}
            />
          </figure>
          <Link
            href='/login'
            className='block w-60 bg-sky-600 hover:bg-sky-500 py-6 rounded-full text-center no-underline text-stone-100 text-xl lowercase tracking-[3px] mx-auto my-0 shadow-lg'
          >
            sign in
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Verified;
