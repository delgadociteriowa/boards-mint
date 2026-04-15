'use client';
import { useSession } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { useSearchParams} from "next/navigation";
import { useSocket } from "@/app/hooks/useSocket";
import { addBoard, updateBoard } from "@/state/board/boardSlice";

const SaveBoard = () => {
  const { data: session } = useSession();
  const {
    id,
    phaseTwo,
    gameGrid,
    selectedGame,
    updatedAt,
    socketActive,
    shareDelay
  }  = useAppSelector(state => state.board);
  const { hCreatesGameRoom, hDeletesGameRoom, gLeavesGameRoom } = useSocket();

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const boardId = searchParams.get("id");
  const roomId = searchParams.get("room");
  
  const handleClick = async () => {
    const answer = window.confirm('Do you want to save the current board?');
    if (!answer) return

    if (!boardId) {
      await dispatch(addBoard({ gameGrid, selectedGame }));
    } else {
      await dispatch(updateBoard({id: boardId, gameGrid: gameGrid}));
    }
  };

  const styleByPhase = !phaseTwo ? "bg-sky-600 hover:bg-sky-500 cursor-pointer" : "bg-stone-600 cursor-not-allowed opacity-60"; 
  const styleByShare = !shareDelay || !phaseTwo ? "bg-sky-600 hover:bg-sky-500 cursor-pointer" : "bg-stone-600 cursor-not-allowed opacity-60"; 

  return (
    <div className='flex flex-wrap w-[90%] mb-14 landscape:w-[75%] mx-auto md:flex-nowrap'>
      {session &&
        (<>
          <button
            className={`text-stone-100 px-6 py-1 rounded-xl w-[calc(50%-4px)] md:w-auto ${styleByPhase}`}
            onClick={handleClick}
            disabled={phaseTwo}
          >
            save
          </button>
          <button
            className={`text-stone-100 px-6 py-1 rounded-xl ml-2 w-[calc(50%-4px)] md:w-auto ${styleByShare}`}
            onClick={!socketActive ? hCreatesGameRoom : hDeletesGameRoom}
            disabled={phaseTwo || shareDelay}
          >
            {socketActive ? "stop sharing" : "share"}
          </button>
          {updatedAt &&
            (<span className="w-full text-center mt-3 text-sm font-texts text-stone-500 md:w-auto md:ml-auto md:mr-2 md:mt-0">Last Saved: {updatedAt}</span>)
          } 
        </>)
      }
      {roomId && (
        <button
          className={`text-stone-100 px-6 py-1 rounded-xl ${styleByPhase}`}
          onClick={gLeavesGameRoom}
        >
          leave game
        </button>
      )}
    </div>
  )
};

export default SaveBoard;