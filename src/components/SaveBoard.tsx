'use client';
import { addBoard, updateBoard } from '@/state/board/boardSlice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';
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
  const dialogRef = useRef<HTMLDialogElement | null>(null);
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

  const handleClick = async () => {
    const answer = window.confirm('Do you want to save the current board?');
    if (!answer) return;

    if (!boardId) {
      await dispatch(addBoard({ gameGrid, selectedGame }));
    } else {
      await dispatch(updateBoard({ id: boardId, gameGrid: gameGrid }));
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const roomUrl = currentUrl.replace('id=', 'room=');
    try {
      await navigator.clipboard.writeText(roomUrl);
      alert(
        'The game room link has been copied to your clipboard! Share it to start playing online.',
      );
    } catch (error) {
      alert('Could not copy the link');
      console.error(error);
    }
  };

  const openModal = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    dialog.scrollTop = 0;
  };

  const closeModal = () => {
    dialogRef.current?.close();
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
        >
          ?
        </button>
        {session && !roomId && (
          <>
            <button
              className={`flex-1 md:flex-none text-stone-100 px-6 py-1 rounded-full w-[calc(50%-4px)] md:w-auto ${styleByPhase}`}
              onClick={handleClick}
              disabled={phaseTwo}
            >
              save
            </button>
            {socketActive && (
              <button
                className={`flex-1 md:flex-none text-stone-100 px-6 py-1 rounded-full w-[calc(50%-4px)] md:w-auto ${styleByPhase}`}
                onClick={handleShare}
              >
                share
              </button>
            )}
            <button
              className={`flex-1 md:flex-none text-stone-100 px-6 py-1 rounded-full w-[calc(50%-4px)] md:w-auto ${styleByShare}`}
              onClick={!socketActive ? hCreatesGameRoom : hDeletesGameRoom}
              disabled={phaseTwo || shareDelay}
            >
              {socketActive ? 'end' : 'online room'}
            </button>
            {updatedAt && (
              <span
                className='
                w-full
                md:w-auto
                text-center
                mt-3
                md:mt-0
                md:ml-auto
                md:mr-2
                text-sm
                font-texts
                text-stone-500
              '
              >
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

      <dialog
        ref={dialogRef}
        className='rounded-xl p-6 backdrop:bg-black/40 w-[90%] md:w-[500px] h-[75%] md:h-[700px] mx-auto my-18 overflow-hidden bg-stone-50 text-stone-600'
        onCancel={(e) => {
          e.preventDefault();
          closeModal();
        }}
        onClick={(e) => {
          const dialog = dialogRef.current;
          if (!dialog) return;

          const rect = dialog.getBoundingClientRect();
          const isInDialog =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

          if (!isInDialog) {
            closeModal();
          }
        }}
      >
        <div className='h-full overflow-y-auto p-2'>
          <DialogHowto />
          <button
            onClick={closeModal}
            className='flex-none text-stone-100 px-6 py-1 rounded-full bg-sky-600 hover:bg-sky-500 cursor-pointer'
          >
            close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default SaveBoard;
