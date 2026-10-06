import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import Mailbox from '../../../assets/mailbox.svg';

const Inbox = () => {
  return (
    <>
      <Header />
      <main className='h-200'>
        <section className='py-10 px-10 text-stone-600'>
          <h3 className='text-center text-4xl tracking-[2px] mt-10 mb-8'>
            Verify Your Email
          </h3>
          <p className='text-center text-xl mb-10'>
            Your account has been created successfully.
            <br /> Please check your email and click the verification link
            <br /> to complete your registration.
          </p>
          <figure className='h-40 mx-0 my-16'>
            <Image
              src={Mailbox}
              alt='Mail box image'
              className='block h-full mx-auto my-0'
              width={500}
              height={500}
            />
          </figure>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Inbox;
