import { render } from '@testing-library/react';
import MovieCard from '../components/MovieCard';

describe('MovieCard component', () => {
  const mockMovie = {
    id: 1,
    title: 'Example Movie',
    poster: 'https://example.com/poster.jpg',
    releaseYear: 2023,
    genres: ['Action', 'Adventure']
  };

  it('should render movie details including genres', () => {
    const { getByAltText, getByText } = render(<MovieCard movie={mockMovie} />);

    const posterElement = getByAltText(mockMovie.title);
    expect(posterElement).toBeInTheDocument();
    expect(posterElement.getAttribute('src')).toBe(mockMovie.poster);

    const titleElement = getByText(mockMovie.title);
    expect(titleElement).toBeInTheDocument();

    const releaseYearElement = getByText(mockMovie.releaseYear.toString());
    expect(releaseYearElement).toBeInTheDocument();

    mockMovie.genres.forEach(genre => {
      const genreElement = getByText(genre);
      expect(genreElement).toBeInTheDocument();
    });
  });

  it('should handle missing poster image', () => {
    const movieWithoutPoster = { ...mockMovie, poster: undefined };
    const { getByAltText } = render(<MovieCard movie={movieWithoutPoster} />);

    const defaultPosterElement = getByAltText('No Title');
    expect(defaultPosterElement).toBeInTheDocument();
    expect(defaultPosterElement.getAttribute('src')).toBe('https://example.com/no-image.jpg');
  });

  it('should handle missing title and release year', () => {
    const movieWithoutTitleAndYear = { ...mockMovie, title: undefined, releaseYear: undefined };
    const { getByText } = render(<MovieCard movie={movieWithoutTitleAndYear} />);

    const defaultTitleElement = getByText('No Title');
    expect(defaultTitleElement).toBeInTheDocument();

    const defaultYearElement = getByText('No Year');
    expect(defaultYearElement).toBeInTheDocument();
  });

  it('should handle empty genres', () => {
    const movieWithoutGenres = { ...mockMovie, genres: [] };
    const { queryByText } = render(<MovieCard movie={movieWithoutGenres} />);

    const genresElement = queryByText('Genres:');
    expect(genresElement).toBeNull();
  });
});

