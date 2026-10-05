'use client';

import { useOctoboard } from '@/app/hooks/useOctoboard';
import { useSocket } from '@/app/hooks/useSocket';
import { createPieceStyle, createSquareStyle } from '@/utils/uiSquare';
import BoardSocketPlayers from './BoardSocketPlayers';
import ErrorComponent from './ErrorComponent';
import OctoBoardSquare from './OctoBoardSquare';
import SaveBoard from './SaveBoard';
import Spinner from './Spinner';

const Octoboard = () => {
  const { selectedGame, gameGrid, phaseTwo, loading, error, handleClickSqr } =
    useOctoboard();

  const { hCreatesGameRoom, hDeletesGameRoom, gLeavesGameRoom } = useSocket();

  return (
    <>
      {(!gameGrid.length || loading) && !error && (
        <Spinner wrapperHeight='800' />
      )}
      {error && <ErrorComponent error={error} />}
      {gameGrid.length && !loading && !error && (
        <main className='w-full md:w-[90%] lg:w-[80%] my-0 mx-auto'>
          <BoardSocketPlayers />
          <div
            className={`grid w-[90%] rounded-2xl board-areas ${selectedGame === 'reversi' ? 'board-areas-reversi' : ''} ${selectedGame === 'tic-tac-toe' ? 'board-areas-tictactoe' : ''} overflow-hidden mt-2 mb-4 mx-auto landscape:w-[75%] shadow-md`}
          >
            {gameGrid.map((row) =>
              row.map((cell) => {
                const squareStyle = createSquareStyle(
                  cell,
                  selectedGame,
                  phaseTwo,
                );
                const pieceStyle = createPieceStyle(cell, selectedGame);
                return (
                  <OctoBoardSquare
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
          <SaveBoard
            hCreatesGameRoom={hCreatesGameRoom}
            hDeletesGameRoom={hDeletesGameRoom}
            gLeavesGameRoom={gLeavesGameRoom}
          />
        </main>
      )}
    </>
  );
};

export default Octoboard;
