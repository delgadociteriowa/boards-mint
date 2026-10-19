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
      className={`
        board__ui
        board-areas
        ${selectedGame === 'reversi' ? 'board-areas-reversi' : ''}
        ${selectedGame === 'tic-tac-toe' ? 'board-areas-tictactoe' : ''} `}
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
