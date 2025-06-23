interface CellContent {
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
}

interface OctoBoardSquareProps {
  cellContent: CellContent;
  color: string;
  squareBaseStyle: string;
  onClickPiece: (cell: CellContent) => void;
}

const OctoBoardSquare: React.FC<OctoBoardSquareProps> = ({cellContent, color, squareBaseStyle, onClickPiece}) => (
  <div className={`${cellContent.id} ${color} ${squareBaseStyle} ${cellContent.piece && 'cursor-pointer'}`} onClick={() => onClickPiece(cellContent)}>
    {
      cellContent.piece.includes('checker') ?
        <div className={`${cellContent.pieceType.includes('one') ? 'bg-stone-600' : 'bg-rose-400'} relative w-[60%] h-[60%] rounded-full checker-shadow`}></div>
        :
        <span className={`${cellContent.pieceType === 'one' ? 'text-stone-100' : 'text-stone-800'} piece__size`}>{cellContent.piece}</span>
    }
  </div>
);

export default OctoBoardSquare;