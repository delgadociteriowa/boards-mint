
'use client';
import React, { useState, useEffect } from 'react';
import OctoBoardSquare from './OctoBoardSquare';


type GameNames = 'chess' | 'checkers';

type BoardPiece = {
  id: string;
  piece: string;
  pieceType: string;
}; 
type BoardGridType = BoardPiece[][];

interface OctoBoardProps {
  selectedGame: GameNames;
};

const Octoboard: React.FC<OctoBoardProps> = ({selectedGame}) => {
  const [chessGrid, setChessGrid] = useState(() => {
    const letters = ['a','b','c','d','e','f','g','h'];
    const grid: BoardGridType = Array(12).fill(null).map((_, rowIndex) =>
      Array(8).fill(null).map((_, colIndex) => { 
        return { 
          id: `sqr${colIndex}-${rowIndex}`,
          piece: '',
          pieceType: ''
        };
      })
    );
    return grid;
    }
  );

  const squareBaseStyle = 'aspect-square min-w-6 min-h-6 flex items-center justify-center';

  // chess: ['bg-teal-800 hover:bg-teal-700', 'bg-teal-950 hover:bg-teal-900', 'bg-teal-400 hover:bg-teal-300', 'bg-teal-600 hover:bg-teal-500'],
  // checkers: ['bg-cyan-800 hover:bg-cyan-700', 'bg-cyan-950 hover:bg-cyan-900', 'bg-cyan-400 hover:bg-cyan-300', 'bg-cyan-600 hover:bg-cyan-500']

  const gameColors = {
    chess: ['bg-teal-800', 'bg-teal-950', 'bg-teal-400', 'bg-teal-600'],
    checkers: ['bg-cyan-800', 'bg-cyan-950', 'bg-cyan-400', 'bg-cyan-600']
  };

  const setSquareColor = (row: number, col: number) :string => {
    let color :string = '';
    if (row === 0 || row === 11) {
      color = col % 2 === 0 ? gameColors[selectedGame][1] : gameColors[selectedGame][0];
    }
    if (row === 1 || row === 10) {
      color = col % 2 === 0 ? gameColors[selectedGame][0]: gameColors[selectedGame][1];
    }
    if (row >= 2 && row <= 9) {
      if (row % 2 === 0) {
        color = col % 2 === 0 ? gameColors[selectedGame][3] : gameColors[selectedGame][2];
      } else {
        color = col % 2 === 0 ? gameColors[selectedGame][2] : gameColors[selectedGame][3];
      }
    }
    return color
  }

  const setNewChess = () => {
    setChessGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        const chessPieces = ['♜','♞','♝','♛','♚','♝','♞','♜'];
        const setCells = (cellsInRow: BoardPiece[], rowIndex: number) => {
          return cellsInRow.map((cell, index) => {
            const isPawnRow = (rowIndex === 3 || rowIndex === 8);
            const isPlayerOneRow = (rowIndex === 2 || rowIndex === 3); 
            return {
              ...cell,
              piece: isPawnRow ? '♟' : chessPieces[index],
              pieceType: isPlayerOneRow ? 'one' : 'two',
            };
          });
        };
        newGrid[2] = setCells(newGrid[2], 2);
        newGrid[3] = setCells(newGrid[3], 3);
        newGrid[8] = setCells(newGrid[8], 8);
        newGrid[9] = setCells(newGrid[9], 9);
        return newGrid;
      }
    );
  };
  
  const setNewCheckers = () => {
    setChessGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        const setCells = (cellsInRow: BoardPiece[], rowIndex: number) => {
          return cellsInRow.map((cell, index) => {
            const isPlayerOneRow = (rowIndex === 2 || rowIndex === 3 || rowIndex === 4);
            const isRowIndexEven = (rowIndex === 2 || rowIndex === 4 || rowIndex === 8);
            const isEven = (index + 1) % 2 === 0;
            return {
              ...cell,
              piece: isRowIndexEven ? (isEven ? 'checker' : '') : (isEven ? '' : 'checker'),
              pieceType: isRowIndexEven ? (isEven ? (isPlayerOneRow ? 'one' : 'two') : '') : (isEven ? '' : (isPlayerOneRow ? 'one' : 'two')),
            };
            
          });
        };
        newGrid[2] = setCells(newGrid[2], 2);
        newGrid[3] = setCells(newGrid[3], 3);
        newGrid[4] = setCells(newGrid[4], 4);
        newGrid[7] = setCells(newGrid[7], 7);
        newGrid[8] = setCells(newGrid[8], 8);
        newGrid[9] = setCells(newGrid[9], 9);
        return newGrid;
      }
    );
  };

  useEffect(() => {
    if (selectedGame === 'chess') setNewChess();
    if (selectedGame === 'checkers') setNewCheckers();
  }, []);

  return (
    <main className="w-[100%] md:w-[80%] my-0 mx-auto">
      <div className="grid w-[90%] rounded-2xl board-areas overflow-hidden mt-2 mb-8 mx-auto landscape:w-[75%]">
      {chessGrid.map((row, rowIndex) => (
        row.map((cellContent, colIndex) =>{
          let color = setSquareColor(rowIndex, colIndex);
          return (<OctoBoardSquare key={cellContent.id} cellContent={cellContent} color={color} squareBaseStyle={squareBaseStyle}/>)
        })
      ))}
      </div>
    </main>
  );
};

export default Octoboard;