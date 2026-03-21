import { render, screen } from '@testing-library/react';
import AboutCard from './AboutCard'; 

describe('AboutCard Component', () => {
  const mockProps = {
    color: 'bg-blue-500',
    title: 'Test Title',
    paragraph: 'This is a test paragraph for the component.',
  };

  it('should render the title and paragraph correctly', () => {
    render(<AboutCard {...mockProps} />);
    
    const titleElement = screen.getByText(mockProps.title);
    const paragraphElement = screen.getByText(mockProps.paragraph);

    expect(titleElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });

  it('should apply the color class received via props', () => {
    const { container } = render(<AboutCard {...mockProps} />);
    
    const mainDiv = container.firstChild;
    
    expect(mainDiv).toHaveClass('bg-blue-500');
  });
});