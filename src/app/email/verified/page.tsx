import InfoPageButton from '@/components/visuals/InfoPageButton';
import Image from 'next/image';
import VerifiedImg from '../../../assets/verified.svg';

const Verified = () => {
  return (
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
      <InfoPageButton link='/user/login' text='sign in' />
    </section>
  );
};
export default Verified;
