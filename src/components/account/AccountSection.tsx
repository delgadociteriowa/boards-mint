import SectionTitle from '../visuals/SectionTitle';
import AccountFields from './AccountFields';
import AccountOptions from './AccountOptions';
import AccountPassword from './AccountPassword';

const AccountSection = () => {
  return (
    <>
      <section className='w-[90%] mx-auto max-w-300 pt-14 pb-8 text-stone-600'>
        <SectionTitle title='account' />
      </section>
      <section className='mx-auto w-[90%] max-w-300 pt-1 pb-20 text-stone-700 md:mb-18'>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
          <div className='w-full lg:w-1/2 md:ml-8 flex flex-col gap-6'>
            <AccountFields />
            <AccountPassword />
          </div>
          <div className='w-full lg:w-1/2 md:ml-8'>
            <AccountOptions />
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountSection;
