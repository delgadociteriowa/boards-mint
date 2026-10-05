import { Square } from "@/types/board";
import { Circle as CircleIcon, X as XIcon } from 'lucide-react';

interface OctoBoardSquareProps {
  cell: Square;
  squareStyle: string;
  pieceStyle: string;
  isTicTacToe: boolean;
  onClickPiece: (cell: Square) => void;
}

const OctoBoardSquare = ({
  cell,
  squareStyle,
  pieceStyle,
  isTicTacToe,
  onClickPiece,
}: OctoBoardSquareProps) => {
  const squareBaseStyle = 'aspect-square min-w-6 min-h-6 flex items-center justify-center';

  return (
    <div
      data-testid={cell.id}
      className={`${cell.id} ${squareBaseStyle} ${squareStyle}`}
      onClick={() => onClickPiece(cell)}
    >
      {isTicTacToe && cell.piece === 'tic-x' && (
        <XIcon aria-label='X' className={pieceStyle} strokeWidth={2.5} />
      )}
      {isTicTacToe && cell.piece === 'tic-circle' && (
        <CircleIcon
          aria-label='Circle'
          className={pieceStyle}
          strokeWidth={2.5}
        />
      )}
      {!isTicTacToe && (
        <div className={pieceStyle}>
          {cell.piece.length === 1 && cell.piece}
        </div>
      )}
    </div>
  );
};

export default OctoBoardSquare;