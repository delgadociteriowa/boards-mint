'use client';
import { addBoard, buildSyncGrid, updateBoard } from '@/state/board/boardSlice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  CircleHelp,
  Copy,
  Globe,
  GlobeOff,
  LogOut,
  RefreshCcw,
  Save,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'sonner';
import Dialog from './Dialog';
import DialogHowto from './DialogHowto';

interface SaveBoardProps {
  hCreatesGameRoom: (setToastState: (value: boolean) => void) => void;
  hDeletesGameRoom: (setToastState: (value: boolean) => void) => void;
  gLeavesGameRoom: (setToastState: (value: boolean) => void) => void;
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

  useEffect(() => {
    if (!boardId || !socketActive) return;

    const autoSave = async () => {
      try {
        const promise = dispatch(
          updateBoard({
            id: boardId,
            gameGrid,
          }),
        ).unwrap();

        await toast.promise(promise, {
          error: 'Failed to auto save game',
        });
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(autoSave, 300000);

    return () => {
      clearInterval(interval);
    };
  }, [boardId, socketActive, gameGrid, dispatch]);

  const handleSave = async () => {
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

  const handleRestart = async () => {
    setActiveToast(true);
    const toastId = toast('Restart board', {
      description: 'Do you want to restart the game?',
      duration: Infinity,
      action: {
        label: 'Restart',
        onClick: async () => {
          toast.dismiss(toastId);
          dispatch(buildSyncGrid());
          toast.success('The game has been restarted');
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

  return (
    <>
      <div className='flex flex-wrap justify-center md:justify-start md:flex-nowrap gap-4 md:gap-2 w-[90%] mb-14 landscape:w-[75%] mx-auto'>
        {session && !roomId && (
          <>
            <button
              title='Save game'
              className='flex-none flex items-center justify-center text-stone-200 p-1 rounded-full w-[31px] h-[31px] bg-sky-600 hover:bg-sky-500 cursor-pointer shadow-md'
              onClick={handleSave}
              disabled={activeToast}
            >
              <Save className='w-5 h-5' />
            </button>

            <button
              title={socketActive ? 'Go offline' : 'Online game'}
              className='flex-none flex items-center justify-center text-stone-200 p-1 rounded-full w-[31px] h-[31px] bg-sky-600 hover:bg-sky-500 cursor-pointer shadow-md'
              onClick={() =>
                !socketActive
                  ? hCreatesGameRoom(setActiveToast)
                  : hDeletesGameRoom(setActiveToast)
              }
              disabled={phaseTwo || shareDelay || activeToast}
            >
              {socketActive ? (
                <GlobeOff className='w-5 h-5' />
              ) : (
                <Globe className='w-5 h-5' />
              )}
            </button>
            {socketActive && (
              <button
                title='Share game'
                className='flex-none flex items-center justify-center text-stone-200 p-1 rounded-full w-[31px] h-[31px] bg-sky-600 hover:bg-sky-500 cursor-pointer shadow-md'
                onClick={handleShare}
                disabled={activeToast}
              >
                <Copy className='w-4 h-4' />
              </button>
            )}

            {updatedAt && (
              <span className='w-full order-last md:w-auto text-center mt-3 md:mt-0 md:ml-auto md:mr-2 text-sm font-texts text-stone-500'>
                {saving ? 'Saving...' : `Last Saved: ${updatedAt}`}
              </span>
            )}
          </>
        )}
        {!roomId && (
          <button
            title='Restart game'
            className='flex-none flex items-center justify-center text-stone-200 p-1 rounded-full w-[31px] h-[31px] bg-sky-600 hover:bg-sky-500 cursor-pointer shadow-md'
            disabled={activeToast}
            onClick={handleRestart}
          >
            <RefreshCcw className='w-5 h-5' />
          </button>
        )}
        {roomId && (
          <button
            title='Leave game'
            className='flex-none flex items-center justify-center text-stone-200 px-1 py-1 rounded-full w-[31px] h-[31px] bg-sky-600 hover:bg-sky-500 cursor-pointer shadow-md'
            onClick={() => gLeavesGameRoom(setActiveToast)}
            disabled={activeToast}
          >
            <LogOut className='w-5 h-5' />
          </button>
        )}

        <button
          title='Help'
          className='flex-none flex items-center justify-center text-stone-200 px-1 py-1 rounded-full w-[31px] h-[31px] bg-sky-600 hover:bg-sky-500 cursor-pointer shadow-md'
          onClick={openModal}
          disabled={activeToast}
        >
          <CircleHelp className='w-10 h-10' />
        </button>
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
