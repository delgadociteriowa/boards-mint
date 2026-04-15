'use client';
import { useAppSelector } from "@/state/hooks";

const BoardSocketPlayers = () => {
  const {
    socketActive,
    socketHost,
    socketGuest
  }  = useAppSelector(state => state.board);
  
  return (
    <div className='flex w-[90%] landscape:w-[75%] mx-auto h-4 mb-4'>
      {socketActive &&
        (<>
          <span className="text-sm font-texts text-green-600 font-bold mr-1">host:</span>
          <span className="text-sm font-texts text-stone-600 mr-4">{socketHost}</span>
          <span className="text-sm font-texts text-purple-600 font-bold mr-1">guest:</span>
          <span className="text-sm font-texts text-stone-600">{socketGuest}</span>
        </>)
      }
    </div>
  )
};

export default BoardSocketPlayers;
