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
  const { hCreatesGameRoom, hDeletesGameRoom } = useSocket();

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const boardId = searchParams.get("id");
  
  const handleClick = async () => {
    if (!boardId) {
      await dispatch(addBoard({ gameGrid, selectedGame }));
    } else {
      await dispatch(updateBoard({id: boardId, gameGrid: gameGrid}));
    }
  };

  const styleByPhase = !phaseTwo ? "bg-sky-600 hover:bg-sky-500 cursor-pointer" : "bg-stone-600 cursor-not-allowed opacity-60"; 
  const styleByShare = !shareDelay || !phaseTwo ? "bg-sky-600 hover:bg-sky-500 cursor-pointer" : "bg-stone-600 cursor-not-allowed opacity-60"; 

  return (
    <div className='flex w-[90%] mb-14 landscape:w-[75%] mx-auto'>
      {session &&
        (<>
          <button
            className={`text-stone-100 px-6 py-1 rounded-xl ${styleByPhase}`}
            onClick={handleClick}
            disabled={phaseTwo}
          >
              {id ? "save" : "save"}
          </button>
          <button
            className={`text-stone-100 px-6 py-1 rounded-xl ml-2 ${styleByShare}`}
            onClick={!socketActive ? hCreatesGameRoom : hDeletesGameRoom}
            disabled={phaseTwo || shareDelay}
          >
            {socketActive ? "stop sharing" : "share"}
          </button>
          {/* implementar correctamente: <span className="text-sm font-texts text-stone-600 my-auto ml-2">
            share link: {window.location.origin}{window.location.pathname}?room={id}&host={session?.user.username}
          </span> */}
          {id && (
            <span className="ml-auto text-sm font-texts text-stone-500 my-auto mr-2">Last Saved: {updatedAt}</span>
          )}
        </>)
      }
    </div>
  )
};

export default SaveBoard;