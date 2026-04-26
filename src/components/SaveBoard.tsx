'use client';
import { addBoard, updateBoard } from '@/state/board/boardSlice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

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

  const styleByPhase = !phaseTwo
    ? 'bg-sky-600 hover:bg-sky-500 cursor-pointer'
    : 'bg-stone-600 cursor-not-allowed opacity-60';
  const styleByShare =
    !shareDelay || !phaseTwo
      ? 'bg-sky-600 hover:bg-sky-500 cursor-pointer'
      : 'bg-stone-600 cursor-not-allowed opacity-60';

  return (
    <div className='flex flex-wrap md:flex-nowrap gap-2 w-[90%] mb-14 landscape:w-[75%] mx-auto'>
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
  );
};

export default SaveBoard;
