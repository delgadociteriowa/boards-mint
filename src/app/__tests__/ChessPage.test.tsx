import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chess from '../chess/page';
import BoardState from '@/context/board/BoardState';

describe('Chess Page COmponent', () => {
  beforeEach(() => {
    render(
      <BoardState>
        <Chess />
      </BoardState>
    );
  });

  it('Renders a chess game', () => {
    const towers = screen.getAllByText('♜');
    expect(towers).toHaveLength(4);
  });
  
  it('Moves a piece to an empty space', async () => {
    const selectedPiece = screen.getByTestId('sqr0-2');
    const selectedEmptySqr = screen.getByTestId('sqr0-4');
    fireEvent.click(selectedPiece);
    fireEvent.click(selectedEmptySqr);

    await waitFor(() => {
      expect(selectedEmptySqr).toHaveTextContent('♜');
    });
  });
});