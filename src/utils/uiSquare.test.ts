import { Square } from '@/types/board';
import { createPieceStyle, createSquareStyle } from './uiSquare';

describe('Go board styles', () => {
  it('uses the brown board palette and pointer cursor', () => {
    const square: Square = {
      id: 'sqr0-0',
      piece: '',
      pieceType: '',
      selected: false,
    };

    expect(createSquareStyle(square, 'go', false)).toContain('bg-amber-200');
    expect(createSquareStyle(square, 'go', false)).toContain('cursor-pointer');
  });

  it('renders the two Go stone colors', () => {
    expect(
      createPieceStyle(
        {
          id: 'sqr0-0',
          piece: 'genericPiece',
          pieceType: 'one',
          selected: false,
        },
        'go',
      ),
    ).toContain('bg-stone-950');
    expect(
      createPieceStyle(
        {
          id: 'sqr0-1',
          piece: 'genericPiece',
          pieceType: 'two',
          selected: false,
        },
        'go',
      ),
    ).toContain('bg-stone-50');
  });
});
