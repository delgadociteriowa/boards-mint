import { render, screen } from '@testing-library/react';
import Octoboard from '@/components/Octoboard';
import BoardContext from '@/context/board/boardContext';
import { BoardContextType } from '@/context/board/boardTypes';
import { mockChessGrid } from '../__mocks__/MockChessGrid';


describe('Octoboard', () => {
  it('renders 4 chess towers (♜)', () => {
    const mockContext: BoardContextType = {
      selectedGame: 'chess',
      gameGrid: mockChessGrid,
      selectedSqr: [null, null],
      phaseTwo: false,
      buildGameGrid: jest.fn(),
      selectGame: jest.fn(),
      setGrid: jest.fn(),
      emptyGame: jest.fn(),
      onClickPiece: jest.fn(),
    };

    render(
      <BoardContext.Provider value={mockContext}>
        <Octoboard />
      </BoardContext.Provider>
    );

    const towers = screen.getAllByText('♜');
    expect(towers).toHaveLength(4);
  });
});
