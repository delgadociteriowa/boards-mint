'use client';
import { useAppSelector } from "@/state/hooks";

const BoardSocketPlayers = () => {
  const {
    socketActive,
    socketHost,
    socketGuest
  }  = useAppSelector(state => state.board);
  
  return (
    <div className='flex items-center w-[90%] landscape:w-[75%] mx-auto h-6 px-4'>
      {socketActive &&
        (<>
          <div className="flex-1 flex justify-start">
            <h4 className="font-bold text-sky-500 tracking-[1px]">HOST <span className="font-normal ml-2 text-stone-600 tracking-[0px]">{socketHost}</span></h4>
          </div>
          <div className="flex-1 flex justify-end">
            <h4 className="font-bold text-amber-500 tracking-[1px]">GUEST <span className="font-normal ml-2 text-stone-600 tracking-[0px]">{socketGuest}</span></h4>
          </div>
        </>)
      }
    </div>
  )
};

export default BoardSocketPlayers;
