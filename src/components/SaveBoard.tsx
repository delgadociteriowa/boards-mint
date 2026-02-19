'use client'
import { useSession } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { useSearchParams} from "next/navigation";
import { addBoard, updateBoard } from "@/state/board/boardSlice";

const SaveBoard = () => {
  const { data: session } = useSession();
  const { id, phaseTwo, gameGrid, selectedGame, updatedAt }  = useAppSelector(state => state.board);
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

  return (
    <div className='flex w-[90%] mb-14 landscape:w-[75%] mx-auto'>
      {session &&
        (<>
          <button
            className={`text-stone-100 px-6 py-1 rounded-xl ${styleByPhase}`}
            onClick={handleClick}
            >
              {id ? "save" : "save"}
          </button>
          {id && (
            <span className="ml-auto text-sm font-texts text-stone-500 my-auto mr-2">Last Saved: {updatedAt}</span>
          )}
          </>)
      }
    </div>
  )
};

export default SaveBoard;