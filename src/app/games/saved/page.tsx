'use client';

import SavedList from '@/components/saved/SavedList';
import LoadingComponent from '@/components/visuals/LoadingComponent';
import SectionTitle from '@/components/visuals/SectionTitle';
import { Toaster } from 'sonner';
import { useSavedBoards } from '../../hooks/useSavedBoards';

const Saved = () => {
  const { boards, loading, error, status, handleDelete } = useSavedBoards();
  return (
    <>
      {status === 'loading' ? (
        <LoadingComponent />
      ) : (
        <>
          <section className='w-[90%] mx-auto max-w-300 pt-14 pb-20 md:pb-80 text-stone-600'>
            <SectionTitle title='saved games' />
            <SavedList
              loading={loading}
              error={error}
              boards={boards}
              status={status}
              handleDelete={handleDelete}
            />
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
      )}
    </>
  );
};
export default Saved;
