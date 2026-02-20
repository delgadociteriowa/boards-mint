'use client';

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { buildSyncGrid, selectPiece, getBoard } from "@/state/board/boardSlice";

import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import BoardIdentifier from "./BoardIdentifier";
import SaveBoard from "./SaveBoard";
import OctoBoardSquare from "./OctoBoardSquare";
import { Square } from "@/types/board";

interface ColorsType {
  chess: string[];
  checkers: string[];
};

const Octoboard = () => {
  const searchParams = useSearchParams();
  const queryParamId = searchParams.get("id") || '';
  const router = useRouter();
  const { id, selectedGame, gameGrid, phaseTwo, loading, error }  = useAppSelector(state => state.board);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!queryParamId) {
      dispatch(buildSyncGrid());
    } else {
      dispatch(getBoard(queryParamId));
    } 
  }, [queryParamId, selectedGame, dispatch]);

  useEffect(() => {
    if(!queryParamId && id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", id);
      router.replace(`?${params.toString()}`);
    }
  }, [queryParamId, id]);

  const handleClickSqr = (cell: Square) => {
    if (!phaseTwo) {
      if(!cell.piece) return
      dispatch(selectPiece(cell.id));
      return
    }
    dispatch(selectPiece(cell.id))
  };

  // UI
  const gameColors: ColorsType = {
    chess: ['bg-teal-900','bg-teal-700','bg-teal-500','bg-teal-300'],
    checkers: ['bg-cyan-900','bg-cyan-700','bg-cyan-500','bg-cyan-300']
  };

  const gameColorsHover: ColorsType = {
    chess: ['hover:bg-teal-800','hover:bg-teal-600','hover:bg-teal-400','hover:bg-teal-200'],
    checkers: ['hover:bg-cyan-800','hover:bg-cyan-600','hover:bg-cyan-400','hover:bg-cyan-200']
  };

  const createSquareStyle = (cell: Square): string => {
    if (!selectedGame) return '';

    const [row, col] = cell.id.replace('sqr', '').split('-');
    const selectedGameSet = gameColors[selectedGame];
    const selectedGameHoverSet = gameColorsHover[selectedGame];

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

    if(!phaseTwo) {
      pointer = cell.piece ? 'cursor-pointer' : '';
    } else {
      pointer = 'cursor-pointer';
    }

    let squareStyle = `${color} ${pointer}`;
    return squareStyle
  };

  const createPieceStyle = (cell: Square): string => {
    if(cell.piece.includes('checker')) {
      return `${cell.pieceType.includes('one') ? 'bg-rose-400' : 'bg-stone-600'} relative w-[60%] h-[60%] rounded-full checker-shadow`
    }
    return `${cell.pieceType === 'one' ? 'text-stone-800' : 'text-stone-50'} piece__size select-none [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]`
  }

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
              const squareStyle = createSquareStyle(cell);  
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