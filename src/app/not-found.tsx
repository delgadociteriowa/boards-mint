import InfoPageButton from '@/components/visuals/InfoPageButton';
import Image from 'next/image';
import Notfound from '../assets/notfound.svg';

const NotFoundPage = () => {
  return (
    <section className='pt-10 pb-70 px-10 text-stone-600'>
      <h3 className='text-center text-4xl tracking-[2px] mt-10 mb-8'>
        Not Found
      </h3>
      <p className='text-center text-xl mb-10'>
        Sorry, the page you are trying to reach hasn&apos;t been found.
      </p>
      <figure className='h-40 mx-0 my-16'>
        <Image
          src={Notfound}
          alt='Not found 404 code image'
          className='block h-full mx-auto my-0'
          width={500}
          height={500}
        />
      </figure>
      <InfoPageButton link='/' text='home' />
    </section>
  );
};

export default NotFoundPage;
