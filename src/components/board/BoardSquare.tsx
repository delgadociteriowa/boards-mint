import { Square } from '@/types/board';
import {
  ChessBishop,
  ChessKing,
  ChessKnight,
  ChessPawn,
  ChessQueen,
  ChessRook,
  Circle as CircleIcon,
  X as XIcon,
} from 'lucide-react';

interface BoardSquareProps {
  cell: Square;
  squareStyle: string;
  pieceStyle: string;
  isChess: boolean;
  isTicTacToe: boolean;
  onClickPiece: (cell: Square) => void;
}

const BoardSquare = ({
  cell,
  squareStyle,
  pieceStyle,
  isChess,
  isTicTacToe,
  onClickPiece,
}: BoardSquareProps) => {
  const squareBaseStyle =
    'aspect-square min-w-6 min-h-6 flex items-center justify-center';
  const chessIconProps = { className: pieceStyle, strokeWidth: 1.75 };

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
      {isChess && cell.piece === '♟' && (
        <ChessPawn {...chessIconProps} aria-label='Pawn' />
      )}
      {isChess && cell.piece === '♜' && (
        <ChessRook {...chessIconProps} aria-label='Rook' />
      )}
      {isChess && cell.piece === '♞' && (
        <ChessKnight {...chessIconProps} aria-label='Knight' />
      )}
      {isChess && cell.piece === '♝' && (
        <ChessBishop {...chessIconProps} aria-label='Bishop' />
      )}
      {isChess && cell.piece === '♛' && (
        <ChessQueen {...chessIconProps} aria-label='Queen' />
      )}
      {isChess && cell.piece === '♚' && (
        <ChessKing {...chessIconProps} aria-label='King' />
      )}
      {!isTicTacToe && !isChess && (
        <div className={pieceStyle}>
          {cell.piece.length === 1 && cell.piece}
        </div>
      )}
    </div>
  );
};

export default BoardSquare;
