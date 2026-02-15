'use client';
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/state/hooks';
import { selectPiece, updateBoard, addBoard } from '@/state/board/boardSlice';
import { useSession } from "next-auth/react";
import OctoBoardSquare from './OctoBoardSquare';
import LoadingComponent from './LoadingComponent';

interface ColorsType {
  chess: string[];
  checkers: string[];
};

interface ColorsClickedType {
  chess: string;
  checkers: string;
};

const Octoboard = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const boardId = useAppSelector(state => state.board.id);
  const selectedGame = useAppSelector(state => state.board.selectedGame);
  const gameGrid = useAppSelector(state => state.board.gameGrid);
  const phaseTwo = useAppSelector(state => state.board.phaseTwo);
  const updatedAt = useAppSelector(state => state.board.updatedAt);
  const loading = useAppSelector(state => state.board.loading);
  const error = useAppSelector(state => state.board.error);
  const handleClickSqr = (id: string) => {
    dispatch(selectPiece(id))
  }
  
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

  const handleCreate = async () => {
    await dispatch(addBoard({ gameGrid, selectedGame }));
  };

  const handleSave = async () => {
    await dispatch(updateBoard({id: boardId, gameGrid: gameGrid}));
  };

  const handleClick = async () => {
    if (!boardId) {
      await handleCreate();
    } else {
      await handleSave();
    }
  };

  return (
    <>
      {!gameGrid.length && <LoadingComponent />}
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
        <div className='flex w-[90%] mb-14 landscape:w-[75%] mx-auto'>
          {session &&
            (<>
              <button
                className={`
                  text-stone-100
                  px-6
                  py-1
                  rounded-xl
                  ${!phaseTwo
                    ? "bg-sky-600 hover:bg-sky-500 cursor-pointer"
                    : "bg-stone-600 cursor-not-allowed opacity-60"}
                  `}
                  onClick={handleClick}
                >
                  {boardId ? "save" : "save"}
              </button>
              {boardId && (
                <span className="ml-auto text-sm font-texts text-stone-500 my-auto mr-2">Last Saved: {updatedAt}</span>
              )}
              </>)
           }
        </div>
      </main>
    </>
  );
};

export default Octoboard;