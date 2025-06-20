
'use client';
import React, { useState, useEffect } from 'react';
import OctoBoardSquare from './OctoBoardSquare';

type BoardPiece = {
  id: string;
}; 
type BoardGridType = BoardPiece[][];

const Octoboard = () => {
  const [chessGrid, setChessGrid] = useState(() => {
    const letters = ['a','b','c','d','e','f','g','h'];
    const grid: BoardGridType = Array(12).fill(null).map((_, rowIndex) =>
      Array(8).fill(null).map((_, colIndex) => { 
        return { id: `s${letters[colIndex]}-${rowIndex + 1}` };
      })
    );
    return grid;
    }
  );

  const squareBaseStyle = 'aspect-square min-w-6 min-h-6 flex items-center justify-center';
  
  const colorDiscard = `bg-teal-800 hover:bg-teal-700`;
  const colorDiscardDark = `bg-teal-950 hover:bg-teal-900`;
  const colorSquare = `bg-teal-400 hover:bg-teal-300`;
  const colorSquareDark = `bg-teal-600 hover:bg-teal-500`;

  const setSquareColor = (row: number, col: number) :string => {
    let color :string = '';
    if (row === 0 || row === 11) {
      color = col % 2 === 0 ? colorDiscardDark : colorDiscard;
    }
    if (row === 1 || row === 10) {
      color = col % 2 === 0 ? colorDiscard : colorDiscardDark;
    }
    if (row >= 2 && row <= 9) {
      if (row % 2 === 0) {
        color = col % 2 === 0 ? colorSquareDark : colorSquare;
      } else {
        color = col % 2 === 0 ? colorSquare : colorSquareDark;
      }
    }
    return color
  }

  return (
    <main className="w-[100%] md:w-[80%] my-0 mx-auto">
      <div className="grid w-[90%] rounded-2xl board-areas overflow-hidden mt-2 mb-8 mx-auto landscape:w-[75%]">
      {chessGrid.map((row, rowIndex) => (
        row.map((cellContent, colIndex) =>{
          let color = setSquareColor(rowIndex, colIndex);
          return (<OctoBoardSquare key={cellContent.id} cellId={cellContent.id} color={color} squareBaseStyle={squareBaseStyle}/>)
        })
      ))}
      </div>
    </main>
  );
};

export default Octoboard;