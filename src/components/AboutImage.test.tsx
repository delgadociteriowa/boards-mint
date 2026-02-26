import { render, screen } from '@testing-library/react';
import AboutImage from './AboutImage';

describe('AboutImage Component', () => {
  const mockProps = {
    image: {
      src: '/test-image.jpg',
      height: 350,
      width: 350,
      blurDataURL: 'data:image/png;base64,...',
    },
    alt: 'Test description',
  };

  it('should render the image with the correct alt text and src path', () => {
    render(<AboutImage {...mockProps} />);

    const imageElement = screen.getByRole('img') as HTMLImageElement;
    
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('alt', mockProps.alt);
    expect(imageElement).toHaveAttribute('src');
    expect(imageElement.src).toContain('test-image.jpg');
  });
});