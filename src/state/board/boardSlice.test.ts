import boardReducer, {
  buildSyncGrid,
  flipPiece,
  selectGame,
} from './boardSlice';

describe('Go stone interaction', () => {
  it('places, flips, and removes stones like Reversi', () => {
    let state = boardReducer(undefined, selectGame('go'));
    state = boardReducer(state, buildSyncGrid());

    state = boardReducer(state, flipPiece('sqr0-0'));
    expect(state.gameGrid[0][0].pieceType).toBe('one');
    expect(state.phaseTwo).toBe(true);

    state = boardReducer(state, flipPiece('sqr0-1'));
    expect(state.gameGrid[0][1].pieceType).toBe('two');
    expect(state.phaseTwo).toBe(false);

    state = boardReducer(state, flipPiece('sqr0-0'));
    expect(state.gameGrid[0][0].pieceType).toBe('two');

    state = boardReducer(state, flipPiece('sqr0-0'));
    expect(state.gameGrid[0][0].piece).toBe('');
    expect(state.gameGrid[0][0].pieceType).toBe('');
    expect(state.gameGrid.flat().filter((square) => square.piece)).toHaveLength(
      1,
    );
  });
});
