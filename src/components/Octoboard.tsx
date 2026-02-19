'use client';

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { buildSyncGrid, selectPiece } from "@/state/board/boardSlice";
import { getBoard } from "@/state/board/boardSlice";
import SaveBoard from "./SaveBoard";

import OctoBoardSquare from "./OctoBoardSquare";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";

interface ColorsType {
  chess: string[];
  checkers: string[];
};

interface ColorsClickedType {
  chess: string;
  checkers: string;
};

const Octoboard = () => {
  const dispatch = useAppDispatch();
  const { id, selectedGame, gameGrid, phaseTwo, loading, error }  = useAppSelector(state => state.board);
  const searchParams = useSearchParams();
  const boardId = searchParams.get("id");
  const router = useRouter();
  
  useEffect(() => {
    if (!selectedGame) return;

    if (!boardId) {
      dispatch(buildSyncGrid());
    } else {
      dispatch(getBoard(boardId));
    } 
  }, [selectedGame, dispatch]);

  useEffect(() => {
    if(!boardId && id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", id);
      router.replace(`?${params.toString()}`);
    }
  }, [id]);

  const handleClickSqr = (id: string) => {
    dispatch(selectPiece(id))
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

  const colorsClicked: ColorsClickedType = {chess: 'bg-slate-400', checkers: 'bg-slate-400'};
  const colorsClickedHover: ColorsClickedType = {chess: 'hover:bg-slate-400', checkers: 'hover:bg-slate-400'};

  const setSquareColor = (row: number, col: number, colors: ColorsType) :string => {
    if (selectedGame !== 'chess' && selectedGame !== 'checkers') return '';
    let color = '';
    if (row === 0 || row === 11) {
      color = col % 2 === 0 ? colors[selectedGame][1] : colors[selectedGame][0];
    }
    if (row === 1 || row === 10) {
      color = col % 2 === 0 ? colors[selectedGame][0]: colors[selectedGame][1];
    }
    if (row >= 2 && row <= 9) {
      if (row % 2 === 0) {
        color = col % 2 === 0 ? colors[selectedGame][3] : colors[selectedGame][2];
      } else {
        color = col % 2 === 0 ? colors[selectedGame][2] : colors[selectedGame][3];
      }
    }
    return color
  }
  return (
    <>
      {(!gameGrid.length || loading) && !error && 
        <LoadingComponent />
      }
      {error && (
        <ErrorComponent error={error} />
      )}
      {!loading && !error && (
        <main className="w-[100%] md:w-[90%] lg:w-[80%] my-0 mx-auto">
          <div className='flex w-[90%] landscape:w-[75%] mx-auto'> 
            {boardId && (<span className="text-sm font-texts text-stone-500 ml-auto">ID: {boardId}</span>)}
          </div>
          <div className="grid w-[90%] rounded-2xl board-areas overflow-hidden mt-2 mb-4 mx-auto landscape:w-[75%] shadow-xl/20">
          {gameGrid.map((row, rowIndex) => (
            row.map((cellContent, colIndex) =>{
              if (selectedGame !== 'chess' && selectedGame !== 'checkers') return null;
              const colors = {
                color: setSquareColor(rowIndex, colIndex, gameColors),
                colorHover: setSquareColor(rowIndex, colIndex, gameColorsHover),
                colorClicked: colorsClicked[selectedGame],
                colorClickedHover: colorsClickedHover[selectedGame]
              };
              return (<OctoBoardSquare key={cellContent.id} cellContent={cellContent} colors={colors} onClickPiece={handleClickSqr} phaseTwo={phaseTwo}/>)
            })
          ))}
          </div>
          <SaveBoard/> 
        </main>
      )}
    </>
  )
};

export default Octoboard;