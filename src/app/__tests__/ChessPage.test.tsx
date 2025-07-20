import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chess from '../chess/page';
import BoardState from '@/context/board/BoardState';

describe('Chess Page COmponent', () => {
  it('Renders a chess game', () => {
    render(
      <BoardState>
        <Chess />
      </BoardState>  
    );

    const towers = screen.getAllByText('♜');
    expect(towers).toHaveLength(4);
  });
  
  it('Moves a piece to an empty space', async () => {
    render(
      <BoardState>
        <Chess />
      </BoardState>  
    );

    const selectedPiece = screen.getByTestId('sqr0-2');
    const selectedEmptySqr = screen.getByTestId('sqr0-4');
    fireEvent.click(selectedPiece);
    fireEvent.click(selectedEmptySqr);

    await waitFor(() => {
      expect(selectedEmptySqr).toHaveTextContent('♜');
    });
  });
});