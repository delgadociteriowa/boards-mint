interface BoardIdentifierProps {
  queryParamId: string;
}

const BoardIdentifier = ({queryParamId}: BoardIdentifierProps) => {
  return (
    <div className='flex w-[90%] landscape:w-[75%] mx-auto'> 
      {queryParamId && (<span className="text-sm font-texts text-stone-500 ml-auto">ID: {queryParamId}</span>)}
    </div>
  )
};

export default BoardIdentifier;
