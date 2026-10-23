import InfoPageButton from '@/components/visuals/InfoPageButton';
import Image from 'next/image';
import Error from '../../../assets/error.svg';

const NoToken = () => {
  return (
    <section className='pt-10 pb-70 px-10 text-stone-600'>
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
          className='block h-full mx-auto my-0'
          width={500}
          height={500}
        />
      </figure>
      <InfoPageButton link='/' text='home' />
    </section>
  );
};
export default NoToken;
