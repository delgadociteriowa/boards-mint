import { Square } from "@/types/board";

interface OctoBoardSquareProps {
  cell: Square;
  squareStyle: string;
  pieceStyle: string;
  onClickPiece: (cell: Square) => void;
}

const OctoBoardSquare = ({cell, squareStyle, pieceStyle, onClickPiece} : OctoBoardSquareProps) => {
  const squareBaseStyle = 'aspect-square min-w-6 min-h-6 flex items-center justify-center';
  return (
    <div data-testid={cell.id} className={`${cell.id} ${squareBaseStyle} ${squareStyle}`} onClick={() => onClickPiece(cell)}>
      <div className={`${pieceStyle}`}>{cell.piece.length === 1 && cell.piece}</div>
    </div>
  )
};

export default OctoBoardSquare;