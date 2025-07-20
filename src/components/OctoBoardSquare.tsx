type CellContent = {
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
};

type Colors = {
  color: string;
  colorHover: string;
  colorClicked: string;
  colorClickedHover: string;
};

interface OctoBoardSquareProps {
  cellContent: CellContent;
  colors: Colors;
  onClickPiece: (cell: string) => void;
  phaseTwo: boolean;
}

const OctoBoardSquare: React.FC<OctoBoardSquareProps> = ({cellContent, colors, onClickPiece, phaseTwo}) => {
  const squareBaseStyle = 'aspect-square min-w-6 min-h-6 flex items-center justify-center';
  const { color, colorHover, colorClicked, colorClickedHover } = colors;

  return (
    <div data-testid={cellContent.id} className={`${cellContent.id} ${cellContent.selected ? colorClicked : color} ${!phaseTwo ? (cellContent.selected ? colorClickedHover : (cellContent.piece && colorHover)) : (cellContent.selected ? colorClickedHover : colorHover)} ${squareBaseStyle} ${!phaseTwo ? (cellContent.piece && 'cursor-pointer') : 'cursor-pointer'}`} onClick={() => !phaseTwo ? (cellContent.piece && onClickPiece(cellContent.id)) : onClickPiece(cellContent.id)}>
      {
        cellContent.piece.includes('checker') ?
          <div className={`${cellContent.pieceType.includes('one') ? 'bg-rose-400' : 'bg-stone-600'} relative w-[60%] h-[60%] rounded-full checker-shadow`}></div>
          :
          <span className={`${cellContent.pieceType === 'one' ? 'text-stone-800' : 'text-stone-50'} piece__size select-none [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]`}>{cellContent.piece}</span>
      }
    </div>
  )
};

export default OctoBoardSquare;