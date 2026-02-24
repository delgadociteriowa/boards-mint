'use client';

import { createSquareStyle, createPieceStyle } from "@/utils/uiSquare";
import { useOctoboard } from "@/app/hooks/useOctoboard";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import BoardIdentifier from "./BoardIdentifier";
import SaveBoard from "./SaveBoard";
import OctoBoardSquare from "./OctoBoardSquare";

const Octoboard = () => {
  const {
    queryParamId,
    selectedGame,
    gameGrid,
    phaseTwo,
    loading,
    error,
    handleClickSqr
  } = useOctoboard();

  return (
    <>
      {(!gameGrid.length || loading) && !error && <LoadingComponent />}
      {error && <ErrorComponent error={error} />}
      {gameGrid.length && !loading && !error && (
        <main className="w-[100%] md:w-[90%] lg:w-[80%] my-0 mx-auto">
          <BoardIdentifier queryParamId={queryParamId}/>
          <div className="grid w-[90%] rounded-2xl board-areas overflow-hidden mt-2 mb-4 mx-auto landscape:w-[75%] shadow-xl/20">
          {gameGrid.map((row) => (
            row.map((cell) =>{
              const squareStyle = createSquareStyle(cell, selectedGame, phaseTwo);  
              const pieceStyle = createPieceStyle(cell);  
              return (<OctoBoardSquare
                key={cell.id}
                cell={cell}
                squareStyle={squareStyle}
                pieceStyle={pieceStyle}
                onClickPiece={handleClickSqr}
                />)
            })
          ))}
          </div>
          <SaveBoard/> 
        </main>
      )}
    </>)
};

export default Octoboard;