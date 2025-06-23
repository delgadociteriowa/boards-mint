
'use client';
import React, { useState, useEffect } from 'react';
import OctoBoardSquare from './OctoBoardSquare';

type GameNames = 'chess' | 'checkers';

type BoardPiece = {
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
}; 

// type BoardGridType = BoardPiece[][];

type ColorsType = {
  chess: string[];
  checkers: string[];
}

interface OctoBoardProps {
  selectedGame: GameNames;
};

const Octoboard: React.FC<OctoBoardProps> = ({selectedGame}) => {

  const buildGameGrid = () => {
    if (selectedGame === 'checkers') {
      const checkerPiece = (row: number, col: number): [string, string] => {
        const isPlayerOne = [2, 3, 4].includes(row);
        const isPlayerTwo = [7, 8, 9].includes(row);
        const isEvenCol = (col + 1) % 2 === 0;

        const shouldPlace =
          (isPlayerOne && ((row === 3 && !isEvenCol) || (row !== 3 && isEvenCol))) ||
          (isPlayerTwo && ((row === 8 && isEvenCol) || (row !== 8 && !isEvenCol)));

        const piece = shouldPlace ? 'checker' : '';
        const pieceType = shouldPlace ? (isPlayerOne ? 'one' : 'two') : '';
                
        return [piece, pieceType]
      }

      return Array(12).fill(null).map((_, rowIndex) =>
        Array(8).fill(null).map((_, colIndex) => { 
          return { 
            id: `sqr${colIndex}-${rowIndex}`,
            piece: checkerPiece(rowIndex, colIndex)[0],
            pieceType: checkerPiece(rowIndex, colIndex)[1],
            selected: false
          };
        })
      );
    }

    const chessPiece = (row: number, col: number): [string, string] => {
      const chessPieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
      let piece = '';
      let pieceType = '';

      switch (row) {
        case 2:
          piece = chessPieces[col] || '';
          pieceType = 'one';
          break;
        case 3:
          piece = '♟';
          pieceType = 'one';
          break;
        case 8:
          piece = '♟';
          pieceType = 'two';
          break;
        case 9:
          piece = chessPieces[col] || '';
          pieceType = 'two';
          break;
        default:
          break;
      }
      return [piece, pieceType];
    };

    return Array(12).fill(null).map((_, rowIndex) => 
      Array(8).fill(null).map((_, colIndex) => {
          return { 
            id: `sqr${colIndex}-${rowIndex}`,
            piece: chessPiece(rowIndex, colIndex)[0],
            pieceType: chessPiece(rowIndex, colIndex)[1],
            selected: false
          };
        })
    );
  };

  const [gameGrid, setGameGrid] = useState(() => buildGameGrid());
  const [selectedSqr, setSelectedSqr] = useState('');

  const gameColors = {
    chess: ['bg-teal-950','bg-teal-800','bg-teal-600','bg-teal-400'],
    checkers: ['bg-cyan-950','bg-cyan-800','bg-cyan-600','bg-cyan-400']
  };
  
  const gameColorsHover = {
    chess: ['hover:bg-teal-900','hover:bg-teal-700','hover:bg-teal-500','hover:bg-teal-300'],
    checkers: ['hover:bg-cyan-900','hover:bg-cyan-700','hover:bg-cyan-500','hover:bg-cyan-300']
  };

  const setSquareColor = (row: number, col: number, colors: ColorsType) :string => {
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

  const onClickPiece = (cell: string) => {
    const selectedCell = cell.replace('sqr', '').split('-').map(Number);
    const col: number = selectedCell[0];
    const row: number = selectedCell[1];
    setGameGrid(prevGrid => {
      const updated = [...prevGrid];
      updated[row][col] = {...updated[row][col], selected: true}
      return updated
    });
  }

  return (
    <main className="w-[100%] md:w-[80%] my-0 mx-auto">
      <div className="grid w-[90%] rounded-2xl board-areas overflow-hidden mt-2 mb-8 mx-auto landscape:w-[75%]">
      {gameGrid.map((row, rowIndex) => (
        row.map((cellContent, colIndex) =>{
          let color = setSquareColor(rowIndex, colIndex, gameColors);
          let colorHover = setSquareColor(rowIndex, colIndex, gameColorsHover);
          return (<OctoBoardSquare key={cellContent.id} cellContent={cellContent} color={color} colorHover={colorHover} onClickPiece={onClickPiece}/>)
        })
      ))}
      </div>
    </main>
  );
};

export default Octoboard;