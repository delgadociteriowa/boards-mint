'use client';
import React, { useState } from 'react';
import OctoBoardSquare from './OctoBoardSquare';

type GameNames = 'chess' | 'checkers';

type ColorsType = {
  chess: string[];
  checkers: string[];
};

type Square = { 
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
};

type SelectedSquare = [number | null, number | null];

interface OctoBoardProps {
  selectedGame: GameNames;
}

const Octoboard: React.FC<OctoBoardProps> = ({selectedGame}) => {

  const buildGameGrid = () => {
    const boardRows = 12;
    const boardColumns = 8;

    const chessPiece = (row: number, col: number): [string, string] => {
      const playerOnePawnsRow = 3;
      const playerTwoPawnsRow = 8;
      const playerOneChessRow = 2;
      const playerTwoChessRow = 9;

      const chessPieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
      let piece = '';
      let pieceType = '';

      switch (row) {
        case playerOneChessRow:
          piece = chessPieces[col] || '';
          pieceType = 'one';
          break;
        case playerOnePawnsRow:
          piece = '♟';
          pieceType = 'one';
          break;
        case playerTwoPawnsRow:
          piece = '♟';
          pieceType = 'two';
          break;
        case playerTwoChessRow:
          piece = chessPieces[col] || '';
          pieceType = 'two';
          break;
        default:
          break;
      }
      return [piece, pieceType];
    };
    
    const checkerPiece = (row: number, col: number): [string, string] => {
      const playerOneRows = [2, 3, 4];
      const playerTwoRows = [7, 8, 9];
      const isPlayerOne = playerOneRows.includes(row);
      const isPlayerTwo = playerTwoRows.includes(row);
      const isEvenCol = (col + 1) % 2 === 0;

      const shouldPlace =
        (isPlayerOne && ((row === 3 && !isEvenCol) || (row !== 3 && isEvenCol))) ||
        (isPlayerTwo && ((row === 8 && isEvenCol) || (row !== 8 && !isEvenCol)));

      const piece = shouldPlace ? 'checker' : '';
      const pieceType = shouldPlace ? (isPlayerOne ? 'one' : 'two') : '';
              
      return [piece, pieceType]
    }

    return Array(boardRows).fill(null).map((_, rowIndex) =>
      Array(boardColumns).fill(null).map((_, colIndex) => {
        const piece = selectedGame === 'chess' ? chessPiece(rowIndex, colIndex) : checkerPiece(rowIndex, colIndex);  
        return { 
          id: `sqr${colIndex}-${rowIndex}`,
          piece: piece[0],
          pieceType: piece[1],
          selected: false
        };
      })
    );
  };

  const [gameGrid, setGameGrid] = useState<Square[][]>(() => buildGameGrid());
  const [selectedSqr, setSelectedSqr] = useState<SelectedSquare>([null ,null]);
  const [phaseTwo, setPhaseTwo] = useState<boolean>(false);

  const gameColors = {
    chess: ['bg-teal-950','bg-teal-800','bg-teal-600','bg-teal-400'],
    checkers: ['bg-cyan-950','bg-cyan-800','bg-cyan-600','bg-cyan-400']
  };

  const gameColorsHover = {
    chess: ['hover:bg-teal-900','hover:bg-teal-700','hover:bg-teal-500','hover:bg-teal-300'],
    checkers: ['hover:bg-cyan-900','hover:bg-cyan-700','hover:bg-cyan-500','hover:bg-cyan-300']
  };

  const colorsClicked = {chess: 'bg-cyan-500', checkers: 'bg-teal-500'};
  const colorsClickedHover = {chess: 'hover:bg-cyan-400', checkers: 'hover:bg-teal-400'};

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
  
    if(!phaseTwo){
      setGameGrid(prevGrid => {
        const updated = [...prevGrid];
        updated[row][col] = {...updated[row][col], selected: true};
        return updated
      });
      setSelectedSqr([row, col]);
      setPhaseTwo(true);
    } else {
      const selectedCellObj = gameGrid[row][col];
      if (selectedSqr[0] === row && selectedSqr[1] === col) {
        setGameGrid(prevGrid => {
          const updated = [...prevGrid];
          updated[row][col] = {...updated[row][col], selected: false};
          return updated
        });
        setSelectedSqr([null, null]);
        setPhaseTwo(false);
        return undefined;
      } else if(selectedCellObj.piece === '') {
        const selectedState = gameGrid[selectedSqr[0] || 0][selectedSqr[1] || 0];
        setGameGrid(prevGrid => {
          const updated = [...prevGrid];
          updated[row][col] = {
            ...updated[row][col],
            piece: selectedState.piece,
            pieceType: selectedState.pieceType
          };
          updated[selectedSqr[0] || 0][selectedSqr[1] ||0] = {
            ...updated[selectedSqr[0] || 0][selectedSqr[1] || 0],
            piece: '',
            pieceType: '',
            selected: false
          };
          return updated
        });
      } else {
        const isPieceTypeOne = gameGrid[row][col].pieceType === 'one';
        const discardPlaces = isPieceTypeOne ? [...gameGrid[0], ...gameGrid[1]] : [...gameGrid[10], ...gameGrid[11]]; 
        const discardPlacesTwo = isPieceTypeOne ? [...gameGrid[10], ...gameGrid[11]] : [...gameGrid[0], ...gameGrid[1]]; 
        const discardAvailable = discardPlaces.find(discardPlace => discardPlace.piece === '') ?? discardPlacesTwo.find(discardPlace => discardPlace.piece === '');
        const discardAvailableCol = discardAvailable?.id.replace('sqr', '').split('-').map(Number)[0];
        const discardAvailableRow = discardAvailable?.id.replace('sqr', '').split('-').map(Number)[1];
        const selectedSqrState = gameGrid[selectedSqr[0] || 0][selectedSqr[1] || 0];

        setGameGrid(prevGrid => {
          const updated = [...prevGrid];
          updated[discardAvailableRow || 0][discardAvailableCol || 0] = {
            ...updated[discardAvailableRow || 0][discardAvailableCol || 0],
            piece: selectedCellObj.piece,
            pieceType: selectedCellObj.pieceType
          };
          updated[row][col] = {
            ...updated[row][col],
            piece: selectedSqrState.piece,
            pieceType: selectedSqrState.pieceType
          };
          updated[selectedSqr[0] || 0][selectedSqr[1] || 0] = {
            ...updated[selectedSqr[0] || 0][selectedSqr[1] || 0],
            piece: '',
            pieceType:'',
            selected: false
          };
          return updated
        });
        
      }
      setSelectedSqr([null, null]);
      setPhaseTwo(false);
      return undefined;
    }
  }

  return (
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
  );
};

export default Octoboard;