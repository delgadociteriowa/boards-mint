'use client';
import { useAppSelector, useAppDispatch } from "@/state/hooks";

interface BoardIdentifierProps {
  queryParamId: string;
}

const BoardIdentifier = ({queryParamId}: BoardIdentifierProps) => {
  const {
    socketActive,
  }  = useAppSelector(state => state.board);
  return (
    <div className='flex w-[90%] landscape:w-[75%] mx-auto'>
      {socketActive &&
        (<>
          <span className="text-sm font-texts text-green-600 font-bold mr-1">host:</span>
          <span className="text-sm font-texts text-stone-600 mr-4">carlos</span>
          <span className="text-sm font-texts text-purple-600 font-bold mr-1">guest:</span>
          <span className="text-sm font-texts text-stone-600">player</span>
        </>)
      }
      
      {queryParamId && (<span className="text-sm font-texts text-stone-500 ml-auto">ID: {queryParamId}</span>)}
    </div>
  )
};

export default BoardIdentifier;
