import { render, screen } from '@testing-library/react';
import BoardIdentifier from './BoardIdentifier'; 

describe('BoardIdentifier Component', () => {
  const mockProps = {
    queryParamId: 'test-id'
  };

  it('should render the board id', () => {
    render(<BoardIdentifier {...mockProps} />);
    
    const spanElement = screen.getByText(`ID: ${mockProps.queryParamId}`);

    expect(spanElement).toBeInTheDocument();
  });
});