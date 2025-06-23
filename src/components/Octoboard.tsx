
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
type BoardGridType = BoardPiece[][];

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
  const [phaseTwo, setPhaseTwo] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(false);

  
  const gameColors = {
    chess: ['bg-teal-950 hover:bg-teal-900','bg-teal-800 hover:bg-teal-700','bg-teal-600 hover:bg-teal-500','bg-teal-400 hover:bg-teal-300'],
    checkers: ['bg-cyan-950 hover:bg-cyan-900','bg-cyan-800 hover:bg-cyan-700','bg-cyan-600 hover:bg-cyan-500','bg-cyan-400 hover:bg-cyan-300']
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
    setGameGrid(prevGrid => {
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
    setGameGrid(prevGrid => {
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

  const onClickPiece = (cell: BoardPiece) => {
    console.log(cell.id);
    console.log(cell.piece);
  }

  // useEffect(() => {
  //   if (selectedGame === 'chess') setNewChess();
  //   if (selectedGame === 'checkers') setNewCheckers();
  // }, []);

  return (
    <main className="w-[100%] md:w-[80%] my-0 mx-auto">
      <div className="grid w-[90%] rounded-2xl board-areas overflow-hidden mt-2 mb-8 mx-auto landscape:w-[75%]">
      {gameGrid.map((row, rowIndex) => (
        row.map((cellContent, colIndex) =>{
          let color = setSquareColor(rowIndex, colIndex);
          return (<OctoBoardSquare key={cellContent.id} cellContent={cellContent} color={color} onClickPiece={onClickPiece} phaseTwo={phaseTwo}/>)
        })
      ))}
      </div>
    </main>
  );
};

export default Octoboard;