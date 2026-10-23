import InfoPageButton from '@/components/visuals/InfoPageButton';
import Image from 'next/image';
import Construction from '../../../assets/construction.svg';

const Soon = () => {
  return (
    <section className='py-10 pt-10 pb-60 text-stone-600'>
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
      <InfoPageButton link='/games' text='games' />
    </section>
  );
};
export default Soon;
