import { buildGameGrid } from './boardSetup';

describe('Go board setup', () => {
  it('creates an empty 19 by 19 board', () => {
    const grid = buildGameGrid('go');

    expect(grid).toHaveLength(19);
    expect(grid.every((row) => row.length === 19)).toBe(true);
    expect(grid.flat().every((square) => square.piece === '')).toBe(true);
  });
});
