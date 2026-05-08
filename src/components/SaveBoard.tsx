'use client';
import { addBoard, updateBoard } from '@/state/board/boardSlice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { Toaster, toast } from 'sonner';
import Dialog from './Dialog';
import DialogHowto from './DialogHowto';

interface SaveBoardProps {
  hCreatesGameRoom: () => void;
  hDeletesGameRoom: () => void;
  gLeavesGameRoom: () => void;
}

const SaveBoard = ({
  hCreatesGameRoom,
  hDeletesGameRoom,
  gLeavesGameRoom,
}: SaveBoardProps) => {
  const { data: session } = useSession();
  const {
    phaseTwo,
    gameGrid,
    selectedGame,
    updatedAt,
    socketActive,
    shareDelay,
    saving,
  } = useAppSelector((state) => state.board);

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const boardId = searchParams.get('id');
  const roomId = searchParams.get('room');

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [activeToast, setActiveToast] = useState(false);

  const handleClick = async () => {
    setActiveToast(true);
    const toastId = toast('Save board', {
      description: 'Do you want to save the game?',
      duration: Infinity,
      action: {
        label: 'Save',
        onClick: async () => {
          toast.dismiss(toastId);

          const promise = !boardId
            ? dispatch(addBoard({ gameGrid, selectedGame })).unwrap()
            : dispatch(updateBoard({ id: boardId, gameGrid })).unwrap();

          await toast.promise(promise, {
            loading: 'Saving game...',
            success: 'Game saved',
            error: 'Failed to save game',
          });

          setActiveToast(false);
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {
          toast.dismiss(toastId);
          setActiveToast(false);
        },
      },
    });
  };

  const handleShare = async () => {
    setActiveToast(true);
    const currentUrl = window.location.href;
    const roomUrl = currentUrl.replace('id=', 'room=');
    try {
      await navigator.clipboard.writeText(roomUrl);
      toast.success('Link copied', {
        description:
          'The game room link has been copied to your clipboard! Share it to start playing online.',
      });
      setActiveToast(false);
    } catch (error) {
      toast.error('Could not copy the link');
      console.error(error);
      setActiveToast(false);
    }
  };

  const openModal = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    dialog.scrollTop = 0;
  };

  const styleByPhase = !phaseTwo
    ? 'bg-sky-600 hover:bg-sky-500 cursor-pointer'
    : 'bg-stone-600 cursor-not-allowed opacity-60';
  const styleByShare =
    !shareDelay || !phaseTwo
      ? 'bg-sky-600 hover:bg-sky-500 cursor-pointer'
      : 'bg-stone-600 cursor-not-allowed opacity-60';

  return (
    <>
      <div className='flex flex-wrap md:flex-nowrap gap-2 w-[90%] mb-14 landscape:w-[75%] mx-auto'>
        <button
          className='flex-none text-stone-200 px-1 py-1 rounded-full w-[32px] h-[32px] bg-stone-400 hover:bg-stone-300 cursor-pointer'
          onClick={openModal}
          disabled={activeToast}
        >
          ?
        </button>
        {session && !roomId && (
          <>
            <button
              className={`flex-1 md:flex-none text-stone-100 px-6 py-1 rounded-full w-[calc(50%-4px)] md:w-auto ${styleByPhase}`}
              onClick={handleClick}
              disabled={phaseTwo || activeToast}
            >
              save
            </button>
            {socketActive && (
              <button
                className={`flex-1 md:flex-none text-stone-100 px-6 py-1 rounded-full w-[calc(50%-4px)] md:w-auto ${styleByPhase}`}
                onClick={handleShare}
                disabled={activeToast}
              >
                share
              </button>
            )}
            <button
              className={`flex-1 md:flex-none text-stone-100 px-6 py-1 rounded-full w-[calc(50%-4px)] md:w-auto ${styleByShare}`}
              onClick={!socketActive ? hCreatesGameRoom : hDeletesGameRoom}
              disabled={phaseTwo || shareDelay || activeToast}
            >
              {socketActive ? 'end' : 'online room'}
            </button>
            {updatedAt && (
              <span className='w-full md:w-auto text-center mt-3 md:mt-0 md:ml-auto md:mr-2 text-sm font-texts text-stone-500'>
                {saving ? 'Saving...' : `Last Saved: ${updatedAt}`}
              </span>
            )}
          </>
        )}
        {roomId && (
          <button
            className={`flex-1 md:flex-none text-stone-100 px-6 py-1 rounded-full ${styleByPhase}`}
            onClick={gLeavesGameRoom}
          >
            leave game
          </button>
        )}
      </div>
      <Dialog reference={dialogRef}>
        <DialogHowto />
      </Dialog>
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

export default SaveBoard;
