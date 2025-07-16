'use client';
import { ReactNode, useState } from 'react';
import boardContext from './boardContext';

type Square = { 
  id: string;
  piece: string;
  pieceType: string;
  selected: boolean;
};

type SelectedSquare = [number | null, number | null];

const BoardState = ({ children }: { children: ReactNode }) => {

  // states
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [gameGrid, setGameGrid] = useState<Square[][]>([]);
  const [selectedSqr, setSelectedSqr] = useState<SelectedSquare>([null ,null]);
  const [phaseTwo, setPhaseTwo] = useState<boolean>(false);

  // functions
  const placeChessPiece = (row: number, col: number): [string, string] => {
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

  const placeCheckerPiece = (row: number, col: number): [string, string] => {
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

  const buildGameGrid = () :Square[][] => {
    const boardRows = 12;
    const boardColumns = 8;

    return Array(boardRows).fill(null).map((_, rowIndex) =>
      Array(boardColumns).fill(null).map((_, colIndex) => {
        const piece = selectedGame === 'chess' ? placeChessPiece(rowIndex, colIndex) : placeCheckerPiece(rowIndex, colIndex);  
        return { 
          id: `sqr${colIndex}-${rowIndex}`,
          piece: piece[0],
          pieceType: piece[1],
          selected: false
        };
      })
    );
  };

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
    <boardContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        gameGrid,
        setGameGrid,
        selectedSqr,
        setSelectedSqr,
        phaseTwo,
        setPhaseTwo,
        buildGameGrid,
        onClickPiece
      }}
    >
      {children}
    </boardContext.Provider>
  )
};

export default BoardState;
