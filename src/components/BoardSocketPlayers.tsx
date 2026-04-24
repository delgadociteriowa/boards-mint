'use client';
import { useAppSelector } from '@/state/hooks';

const BoardSocketPlayers = () => {
  const { socketActive, socketHost, socketGuest } = useAppSelector(
    (state) => state.board,
  );

  const socketHostTrimmed =
    socketHost.length > 7 ? `${socketHost.slice(0, 7)}...` : socketHost;
  const socketGuestTrimmed =
    socketGuest.length > 7 ? `${socketGuest.slice(0, 7)}...` : socketGuest;

  return (
    <div className='flex items-center w-[90%] landscape:w-[75%] mx-auto h-6 px-4'>
      {socketActive && (
        <>
          <div className='flex-1 flex justify-start'>
            <h4 className='font-bold text-sky-500 tracking-[1px]'>
              HOST{' '}
              <span className='font-normal ml-2 text-stone-600 tracking-[0px]'>
                {socketHostTrimmed}
              </span>
            </h4>
          </div>
          <div className='flex-1 flex justify-end'>
            <h4 className='font-bold text-amber-500 tracking-[1px]'>
              GUEST{' '}
              <span className='font-normal ml-2 text-stone-600 tracking-[0px]'>
                {socketGuestTrimmed}
              </span>
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default BoardSocketPlayers;
