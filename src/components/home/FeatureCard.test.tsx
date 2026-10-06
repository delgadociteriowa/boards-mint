import { render, screen } from '@testing-library/react';
import FeatureCard from './FeatureCard';
import { StaticImageData } from 'next/image';

describe('FeatureCard Component', () => {
  const mockProps = {
    icon: {
      src: '/test-image.jpg',
      height: 80,
      width: 80,
      blurDataURL: 'data:image/png;base64,...',
    },
    altText: 'Test alt',
    title: 'Test title',
    paragraph: 'Test paragraph',
  };

  beforeEach(() => {
    render(<FeatureCard {...mockProps} />);
  });

  it('should render the image with the correct alt text and src path', () => {
    const imageElement = screen.getByRole('img') as HTMLImageElement;

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('alt', mockProps.altText);
    expect(imageElement).toHaveAttribute('src');
    expect(imageElement.src).toContain('test-image.jpg');
  });

  it('should render the title and paragraph correctly', () => {
    const titleElement = screen.getByText(mockProps.title);
    const paragraphElement = screen.getByText(mockProps.paragraph);

    expect(titleElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});