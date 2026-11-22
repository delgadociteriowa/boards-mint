'use client';

import { useBoard } from '@/app/hooks/useBoard';
import { SelectedGame } from '@/types/board';

import ErrorComponent from '../visuals/ErrorComponent';
import Spinner from '../visuals/Spinner';
import Board from './Board';
import OnlinePlayers from './OnlinePlayers';
import ToolsBar from './ToolsBar';

interface GameSetProps {
  selectedGame: SelectedGame;
}

const GameSet = ({ selectedGame }: GameSetProps) => {
  const { gameGrid, phaseTwo, loading, error, handleClickSqr } =
    useBoard(selectedGame);

  return (
    <>
      {(!gameGrid.length || loading) && !error && (
        <Spinner wrapperHeight='800' />
      )}
      {error && <ErrorComponent error={error} />}
      {gameGrid.length && !loading && !error && (
        <main className='w-full md:w-[90%] lg:w-[80%] my-0 mx-auto'>
          <OnlinePlayers />
          <Board
            selectedGame={selectedGame}
            gameGrid={gameGrid}
            phaseTwo={phaseTwo}
            handleClickSqr={handleClickSqr}
          />
          <ToolsBar />
        </main>
      )}
    </>
  );
};

export default GameSet;
