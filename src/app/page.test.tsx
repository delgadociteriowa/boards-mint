import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import BoardContext from '@/context/board/boardContext';

describe('Home Page', () => {
  it('Displays BOARDS title', () => {
    const mockContext = {
      selectedGame: '',
      gameGrid: [],
      selectedSqr: [],
      phaseTwo: false,
      selectGame: jest.fn(),
      setGrid: jest.fn(),
      emptyGame: jest.fn(),
      onClickPiece: jest.fn()
    };

    render(
      <BoardContext.Provider value={mockContext as any}>
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
