interface OctoBoardSquareProps {
  cellId: string;
  color: string;
  squareBaseStyle: string;
}

const OctoBoardSquare: React.FC<OctoBoardSquareProps> = ({cellId, color, squareBaseStyle}) => (
  <div className={`${cellId} ${color} ${squareBaseStyle}`}></div>
);

export default OctoBoardSquare;