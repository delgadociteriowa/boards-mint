'use client';
import React from 'react';
import OctoBoardSquare from './OctoBoardSquare';
import LoadingComponent from './LoadingComponent';
import { useAppSelector, useAppDispatch } from '@/state/hooks';
import { selectPiece } from '@/state/board/boardSlice';
import formatDate from '@/utils/formatDate';

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
  const boardId = useAppSelector(state => state.board.id);
  const lastSaved = useAppSelector(state => state.board.lastSaved);
  const selectedGame = useAppSelector(state => state.board.selectedGame);
  const gameGrid = useAppSelector(state => state.board.gameGrid);
  const phaseTwo = useAppSelector(state => state.board.phaseTwo);
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

  return (
    <>
      {selectedGame && gameGrid.length > 0 ? (
        <main className="w-[100%] md:w-[90%] lg:w-[80%] my-0 mx-auto">
          {boardId && (<div className='flex w-[90%] landscape:w-[75%] mx-auto'> 
              <span className="text-sm font-texts text-stone-500 ml-auto">ID: {boardId}</span>
          </div>)}
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
          {boardId && (<div className='flex w-[90%] mb-14 landscape:w-[75%] mx-auto'>
            <button className="bg-sky-600 hover:bg-sky-500 text-stone-100 px-6 py-1 rounded-xl cursor-pointer">
            save
            </button>
            <span className="ml-auto text-sm font-texts text-stone-500 my-auto mr-2">Last Saved: {lastSaved}</span>
          </div>)}
        </main>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};

export default Octoboard;