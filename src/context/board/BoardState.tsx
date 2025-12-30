'use client';
import { ReactNode, useReducer } from 'react';
import boardContext from './boardContext';
import BoardReducer from './boardReducer';
import { 
  SELECTED_GAME,
  SELECTED_PIECE,
  TARGETED_SELF,
  TARGETED_EMPTY,
  TARGETED_PIECE,
  CLOSED_GAME
} from '../types';
import { BoardStateType, SelectedGame } from './boardTypes';

const BoardState = ({ children }: { children: ReactNode }) => {

  const initialState: BoardStateType = {
    selectedGame: '',
    gameGrid: [],
    selectedSqr: [null, null],
    phaseTwo: false
  }

  const [state, dispatch] = useReducer(BoardReducer, initialState);

  const benchesAreFilled = (): boolean => {
    const benchRows = [0, 1, 10, 11];

    return benchRows.every(rowIndex =>
      state.gameGrid[rowIndex].every(square => square.piece !== "")
    );
  };

  const handleGameSelection = (game: SelectedGame) : void => {
    dispatch({ type: SELECTED_GAME, payload: game});
  }
  
  const handleClickSqr = (clickedSqr: string): void => {
    const [row, col] = clickedSqr.replace('sqr', '').split('-').map(n => Number(n));
    const clickedCell = state.gameGrid[row][col];
    // select piece 
    if(!state.phaseTwo) {
      dispatch({type: SELECTED_PIECE, payload: clickedSqr});
      return
    }
    // benches filled
    if (state.phaseTwo && benchesAreFilled()){
      dispatch({type: TARGETED_SELF});
      return
    }

    // same sqr
    if (state.phaseTwo && row === state.selectedSqr[0] && col === state.selectedSqr[1]) {
      dispatch({type: TARGETED_SELF});
      return
    }

    // empty sqr
    if (state.phaseTwo && clickedCell.piece === '') {
      dispatch({type: TARGETED_EMPTY, payload: clickedSqr});
      return
    }

    // filled sqr
    if (state.phaseTwo && clickedCell.piece) {
      dispatch({type: TARGETED_PIECE, payload: clickedSqr});
      return
    }

    return
  }

  
  const handleExitGame = () =>  {
    dispatch({type: CLOSED_GAME});
  }

  return (
    <boardContext.Provider
      value={{
        selectedGame: state.selectedGame,
        gameGrid: state.gameGrid,
        selectedSqr: state.selectedSqr,
        phaseTwo: state.phaseTwo,
        handleGameSelection,
        handleClickSqr,
        handleExitGame
      }}
    >
      {children}
    </boardContext.Provider>
  )
};

export default BoardState;