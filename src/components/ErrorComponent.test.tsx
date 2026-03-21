import { render, screen } from '@testing-library/react';
import ErrorComponent from './ErrorComponent'; 

describe('ErrorComponent Component', () => {
  const mockProps = {
    error: 'test-id'
  };

  it('should render the error', () => {
    render(<ErrorComponent {...mockProps} />);
    
    const titleElement = screen.getByText(mockProps.error);

    expect(titleElement).toBeInTheDocument();
  });
});