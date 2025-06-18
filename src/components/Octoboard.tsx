
'use client';
import React, { useState, useEffect } from 'react';

type BoardPiece = {
  id: string;
} | null; 
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
  });
  // add grid ids
  return (
    <main className="w-[100%] md:w-[80%] my-0 mx-auto">
      <div className="grid w-[90%] rounded-2xl board-areas overflow-hidden mt-2 mb-8 mx-auto landscape:w-[75%]">
      {chessGrid.map((row, rowIndex) => (
        row.map((cellContent, colIndex) => (
          <div key={`${cellContent?.id}`} className={`${cellContent?.id} aspect-square min-w-6 min-h-6 flex items-center justify-center outline-1`}></div>
        ))
      ))}
      </div>
    </main>
  );
};

export default Octoboard;