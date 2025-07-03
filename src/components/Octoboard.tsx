'use client';
import React, { useEffect } from 'react';
import OctoBoardSquare from './OctoBoardSquare';
import { useGlobalContext } from "@/context/GlobalContext";

type ColorsType = {
  chess: string[];
  checkers: string[];
};

const Octoboard: React.FC = () => {

  const {
    selectedGame,
    buildGameGrid,
    gameGrid,
    setGameGrid,
    phaseTwo,
    onClickPiece
  } = useGlobalContext()!;

  const gameColors = {
    chess: ['bg-teal-950','bg-teal-800','bg-teal-600','bg-teal-400'],
    checkers: ['bg-cyan-950','bg-cyan-800','bg-cyan-600','bg-cyan-400']
  };

  const gameColorsHover = {
    chess: ['hover:bg-teal-900','hover:bg-teal-700','hover:bg-teal-500','hover:bg-teal-300'],
    checkers: ['hover:bg-cyan-900','hover:bg-cyan-700','hover:bg-cyan-500','hover:bg-cyan-300']
  };

  const colorsClicked: { [key: string]: string } = {chess: 'bg-cyan-500', checkers: 'bg-teal-500'};
  const colorsClickedHover: { [key: string]: string } = {chess: 'hover:bg-cyan-400', checkers: 'hover:bg-teal-400'};

  const setSquareColor = (row: number, col: number, colors: ColorsType) :string => {
    if (selectedGame !== 'chess' && selectedGame !== 'checkers') return '';
    let color :string = '';
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

  useEffect(() => {
    if (selectedGame === 'chess' || selectedGame === 'checkers') {
      const grid = buildGameGrid();
      setGameGrid(grid || []);
    }
  }, [selectedGame]);

  return (
    <>
      {selectedGame && gameGrid.length > 0 ? (
        <main className="w-[100%] md:w-[80%] my-0 mx-auto">
          <div className="grid w-[90%] rounded-2xl board-areas overflow-hidden mt-2 mb-8 mx-auto landscape:w-[75%]">
          {gameGrid.map((row, rowIndex) => (
            row.map((cellContent, colIndex) =>{
              const colors = {
                color: setSquareColor(rowIndex, colIndex, gameColors),
                colorHover: setSquareColor(rowIndex, colIndex, gameColorsHover),
                colorClicked: colorsClicked[selectedGame],
                colorClickedHover: colorsClickedHover[selectedGame]
              };
              return (<OctoBoardSquare key={cellContent.id} cellContent={cellContent} colors={colors} onClickPiece={onClickPiece} phaseTwo={phaseTwo}/>)
            })
          ))}
          </div>
        </main>
      ) : (
        <p>
          Loading...
        </p>
      )}
    </>
  );
};

export default Octoboard;