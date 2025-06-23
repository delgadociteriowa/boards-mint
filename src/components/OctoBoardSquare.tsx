interface CellContent {
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
}

interface OctoBoardSquareProps {
  cellContent: CellContent;
  color: string;
  colorHover: string;
}

// onClickPiece: (cell: CellContent) => void;

const OctoBoardSquare: React.FC<OctoBoardSquareProps> = ({cellContent, color, colorHover, onClickPiece}) => {
  const squareBaseStyle = 'aspect-square min-w-6 min-h-6 flex items-center justify-center';
  return (
    <div className={`${cellContent.id} ${color} ${cellContent.piece && colorHover} ${squareBaseStyle} ${cellContent.piece && 'cursor-pointer'}`} onClick={() => validClickable && onClickPiece(cellContent)}>
      {
        cellContent.piece.includes('checker') ?
          <div className={`${cellContent.pieceType.includes('one') ? 'bg-rose-400' : 'bg-stone-600'} relative w-[60%] h-[60%] rounded-full checker-shadow`}></div>
          :
          <span className={`${cellContent.pieceType === 'one' ? 'text-stone-800' : 'text-stone-100'} piece__size`}>{cellContent.piece}</span>
      }
    </div>
  )
};

export default OctoBoardSquare;