import { render, screen } from '@testing-library/react';
import Footer from './Footer';

jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('should render all navigation links', () => {
    expect(screen.getByText('♞BOARDS')).toBeInTheDocument();
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('games')).toBeInTheDocument();
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Carlos Delgado 2026')).toBeInTheDocument();
  });

  it('should render external link with correct href and target', () => {
    const externalLink = screen.getByText('Carlos Delgado 2026');

    expect(externalLink).toHaveAttribute(
      'href',
      'https://delgadociteriowa.github.io/main/'
    );

    expect(externalLink).toHaveAttribute('target', '_blank');
  });
});