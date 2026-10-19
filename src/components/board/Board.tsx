'use client';

import { Grid, SelectedGame, Square } from '@/types/board';
import { createPieceStyle, createSquareStyle } from '@/utils/uiSquare';
import BoardSquare from './BoardSquare';

interface BoardProps {
  selectedGame: SelectedGame;
  gameGrid: Grid;
  phaseTwo: boolean;
  handleClickSqr: (cell: Square) => void;
}

const Board = ({
  selectedGame,
  gameGrid,
  phaseTwo,
  handleClickSqr,
}: BoardProps) => {
  return (
    <div
      className={`grid w-[90%] rounded-2xl board-areas ${selectedGame === 'reversi' ? 'board-areas-reversi' : ''} ${selectedGame === 'tic-tac-toe' ? 'board-areas-tictactoe' : ''} overflow-hidden mt-2 mb-4 mx-auto landscape:w-[75%] shadow-md`}
    >
      {gameGrid.map((row) =>
        row.map((cell) => {
          const squareStyle = createSquareStyle(cell, selectedGame, phaseTwo);
          const pieceStyle = createPieceStyle(cell, selectedGame);
          return (
            <BoardSquare
              key={cell.id}
              cell={cell}
              squareStyle={squareStyle}
              pieceStyle={pieceStyle}
              isChess={selectedGame === 'chess'}
              isTicTacToe={selectedGame === 'tic-tac-toe'}
              onClickPiece={handleClickSqr}
            />
          );
        }),
      )}
    </div>
  );
};

export default Board;
