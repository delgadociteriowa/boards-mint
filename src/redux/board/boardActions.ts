import {
  SELECTED_GAME,
  SELECTED_PIECE,
  TARGETED_SELF,
  TARGETED_EMPTY,
  TARGETED_PIECE,
  CLOSED_GAME
} from './boardTypes';

import { SelectedGame } from './boardTs';

const selectedGame = (game: SelectedGame) => {
  return {
    type: SELECTED_GAME,
    payload: game
  }
}

const selectedPiece = () => {
  return {
    type: SELECTED_PIECE
  };
};

const targetedSelf = () => {
  return {
    type: TARGETED_SELF
  };
};

const targetedEmpty = (id: string) => {
  return {
    type: TARGETED_EMPTY,
    payload: id
  };
};

const targetedPiece = (id: string) => {
  return {
    type: TARGETED_PIECE,
    payload: id
  };
};

const closedGame = () => {
  return {
    type: CLOSED_GAME
  };
};

export {
  selectedGame,
  selectedPiece,
  targetedSelf,
  targetedEmpty,
  targetedPiece,
  closedGame
};