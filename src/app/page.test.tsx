import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import BoardContext from '@/context/board/boardContext';
import { BoardContextType } from '@/context/board/boardTypes';

describe('Home Page', () => {
  it('Displays BOARDS title', () => {
    const mockContext: BoardContextType = {
      selectedGame: '',
      gameGrid: [],
      selectedSqr: [null, null],
      phaseTwo: false,
      buildGameGrid: jest.fn(),
      selectGame: jest.fn(),
      setGrid: jest.fn(),
      emptyGame: jest.fn(),
      onClickPiece: jest.fn()
    };

    render(
      <BoardContext.Provider value={mockContext}>
        <Home />
      </BoardContext.Provider>
    );
    
    const heading = screen.getByRole('heading', {
      name: /boards/i,
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });
});
