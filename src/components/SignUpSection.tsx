import Line from './Line';
import SectionTitle from './SectionTitle';
import SignUpField from './SignUpField';

const SignUpSection = () => {
  return (
    <>
      <section className='w-[90%] mx-auto max-w-[1200px] pt-14 pb-8 text-stone-600'>
        <SectionTitle title='sign up' />
      </section>
      <section className='w-[90%] mx-auto max-w-[1200px] pt-1 pb-20 text-stone-700'>
        <form className='max-w-[600px] flex flex-col gap-6 mx-auto'>
          <SignUpField label='email' />
          <Line />
          <SignUpField label='user name' />
          <Line />
          <SignUpField label='first name' />
          <Line />
          <SignUpField label='last name' />
          <Line />
          <SignUpField label='password' />
          <Line />
          <SignUpField label='confirm password' />
          <button
            className='
                w-[80%]
                md:w-[40%]
                mt-4
                py-3
                mx-auto
                text-center
                text-xl
                tracking-[2px]
                text-stone-100
                bg-sky-600 
                hover:bg-sky-500
                rounded-full
                shadow-md/20
                cursor-pointer
              '
          >
            sign up
          </button>
        </form>
      </section>
    </>
  );
};

export default SignUpSection;
