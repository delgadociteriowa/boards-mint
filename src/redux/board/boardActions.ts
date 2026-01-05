import {
  SELECT_GAME,
  SELECT_PIECE,
  CLOSE_GAME
} from './boardTypes';

import { SelectedGame } from './boardTs';

const selectGame = (game: SelectedGame) => {
  return {
    type: SELECT_GAME,
    payload: game
  }
}

const selectPiece = (id: string) => {
  return {
    type: SELECT_PIECE,
    payload: id
  };
};

const closeGame = () => {
  return {
    type: CLOSE_GAME
  };
};

export {
  selectGame,
  selectPiece,
  closeGame
};