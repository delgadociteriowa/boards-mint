import { Square } from "@/types/board";

interface OctoBoardSquareProps {
  cell: Square;
  squareStyle: string;
  onClickPiece: (cell: Square) => void;
}

const OctoBoardSquare = ({cell, squareStyle, onClickPiece} : OctoBoardSquareProps) => {
  const squareBaseStyle = 'aspect-square min-w-6 min-h-6 flex items-center justify-center';
  return (
    <div
      data-testid={cell.id}
      className={`${cell.id} ${squareBaseStyle} ${squareStyle}`}
      onClick={() => onClickPiece(cell)}>
      {
        cell.piece.includes('checker') ?
          <div className={`${cell.pieceType.includes('one') ? 'bg-rose-400' : 'bg-stone-600'} relative w-[60%] h-[60%] rounded-full checker-shadow`}></div>
          :
          <span className={`${cell.pieceType === 'one' ? 'text-stone-800' : 'text-stone-50'} piece__size select-none [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]`}>{cell.piece}</span>
      }
    </div>
  )
};

export default OctoBoardSquare;