import SavedList from '@/components/saved/SavedList';
import SectionTitle from '@/components/visuals/SectionTitle';
import { Toaster } from 'sonner';

const Saved = () => {
  return (
    <>
      <section className='w-[90%] mx-auto max-w-300 pt-14 pb-20 md:pb-80 text-stone-600'>
        <SectionTitle title='saved games' />
        <SavedList />
      </section>
      <Toaster
        position='top-center'
        toastOptions={{
          classNames: {
            actionButton:
              '!bg-green-600 !text-white hover:!bg-green-500 !rounded-full order-1',
            cancelButton:
              '!bg-sky-600 !text-white hover:!bg-sky-500 !rounded-full order-2 !ml-1',
          },
        }}
        richColors
      />
    </>
  );
};
export default Saved;
