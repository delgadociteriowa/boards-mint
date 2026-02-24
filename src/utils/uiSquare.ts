import { Square, SelectedGame } from "@/types/board";

interface ColorsType {
  chess: string[];
  checkers: string[];
};

const gameColors: ColorsType = {
  chess: ['bg-teal-900','bg-teal-700','bg-teal-500','bg-teal-300'],
  checkers: ['bg-cyan-900','bg-cyan-700','bg-cyan-500','bg-cyan-300']
};

const gameColorsHover: ColorsType = {
  chess: ['hover:bg-teal-800','hover:bg-teal-600','hover:bg-teal-400','hover:bg-teal-200'],
  checkers: ['hover:bg-cyan-800','hover:bg-cyan-600','hover:bg-cyan-400','hover:bg-cyan-200']
};

export const createSquareStyle = (cell: Square, game: SelectedGame, secondPhase: boolean): string => {
  if (game === '') return '';

  const [row, col] = cell.id.replace('sqr', '').split('-');
  const selectedGameSet = gameColors[game];
  const selectedGameHoverSet = gameColorsHover[game];

  let color = '';
  let pointer = '';

  if(cell.selected) {
    color = 'bg-slate-400 hover:bg-slate-500'
  } else {
    if (row === '0' || row === '11') {
      color = Number(col) % 2 === 0 
        ? `${selectedGameSet[1]} ${selectedGameHoverSet[1]}` 
        : `${selectedGameSet[0]} ${selectedGameHoverSet[0]}` 
    }

    if (row === '1' || row === '10') {
      color = Number(col) % 2 === 0 
        ? `${selectedGameSet[0]} ${selectedGameHoverSet[0]}` 
        : `${selectedGameSet[1]} ${selectedGameHoverSet[1]}` 
    }

    if (Number(row) >= 2 && Number(row) <= 9) {
      if (Number(row) % 2 === 0) {
        color = Number(col) % 2 === 0 
          ? `${selectedGameSet[3]} ${selectedGameHoverSet[3]}`
          : `${selectedGameSet[2]} ${selectedGameHoverSet[2]}`;
      } else {
        color = Number(col) % 2 === 0 
          ? `${selectedGameSet[2]} ${selectedGameHoverSet[2]}`
          : `${selectedGameSet[3]} ${selectedGameHoverSet[3]}`;
      }
    }
  }

  if(!secondPhase) {
    pointer = cell.piece ? 'cursor-pointer' : '';
  } else {
    pointer = 'cursor-pointer';
  }

  let squareStyle = `${color} ${pointer}`;
  return squareStyle
};

export const createPieceStyle = (cell: Square): string => {
  if(cell.piece.includes('checker')) {
    return `${cell.pieceType.includes('one') ? 'bg-rose-400' : 'bg-stone-600'} relative w-[60%] h-[60%] rounded-full checker-shadow`
  }
  return `${cell.pieceType === 'one' ? 'text-stone-800' : 'text-stone-50'} piece__size select-none [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]`
}