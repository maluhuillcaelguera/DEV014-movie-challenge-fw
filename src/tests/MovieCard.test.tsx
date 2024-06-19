// MovieCard.test.tsx
import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../models/Movie';

describe('MovieCard Component', () => {
  const movieData: Movie = {
    id: 1,
    title: 'Avatar',
    poster: 'https://example.com/avatar-poster.jpg',
    releaseYear: 2009,
    overview: 'A paraplegic Marine dispatched to the moon Pandora...',
    runtime: 162,
    genres: ['Action', 'Adventure', 'Fantasy'],
    voteAverage: 7.8,
  };

  it('renders movie information correctly', () => {
    render(<MovieCard movie={movieData} />);
    
    expect(screen.getByText('Avatar')).toBeTruthy();
    expect(screen.getByText('A paraplegic Marine dispatched to the moon Pandora...')).toBeTruthy();
    expect(screen.getByText('2009')).toBeTruthy();
    expect(screen.getByAltText('Avatar')).toHaveProperty('src', 'https://example.com/avatar-poster.jpg');
  });

  it('renders correctly with missing overview', () => {
    const partialMovieData: Movie = {
      id: 2,
      title: 'Inception',
      poster: 'https://example.com/inception-poster.jpg',
      releaseYear: 2010,
      overview: '',
      runtime: 148,
      genres: ['Action', 'Sci-Fi', 'Thriller'],
      voteAverage: 8.8,
    };

    render(<MovieCard movie={partialMovieData} />);
    
    expect(screen.getByText('Inception')).toBeTruthy();
    expect(screen.getByText('2010')).toBeTruthy();
    expect(screen.getByAltText('Inception')).toHaveProperty('src', 'https://example.com/inception-poster.jpg');
    expect(screen.queryByText('A paraplegic Marine dispatched to the moon Pandora...')).toBeNull();
  });

  it('renders correctly with missing release year', () => {
    const partialMovieData: Movie = {
      id: 3,
      title: 'Titanic',
      poster: 'https://example.com/titanic-poster.jpg',
      releaseYear: NaN,
      overview: 'A seventeen-year-old aristocrat falls in love...',
      runtime: 195,
      genres: ['Drama', 'Romance'],
      voteAverage: 7.8,
    };

    render(<MovieCard movie={partialMovieData} />);
    
    expect(screen.getByText('Titanic')).toBeTruthy();
    expect(screen.getByText('A seventeen-year-old aristocrat falls in love...')).toBeTruthy();
    expect(screen.getByAltText('Titanic')).toHaveProperty('src', 'https://example.com/titanic-poster.jpg');
    expect(screen.queryByText('2009')).toBeNull();
  });

  it('renders correctly with missing title', () => {
    const partialMovieData: Movie = {
      id: 4,
      title: '',
      poster: 'https://example.com/no-title-poster.jpg',
      releaseYear: 2020,
      overview: 'An unknown movie...',
      runtime: 100,
      genres: ['Unknown'],
      voteAverage: 5.0,
    };

    render(<MovieCard movie={partialMovieData} />);
    
    expect(screen.getByText('An unknown movie...')).toBeTruthy();
    expect(screen.getByText('2020')).toBeTruthy();
    expect(screen.getByAltText('')).toHaveProperty('src', 'https://example.com/no-title-poster.jpg');
  });

  it('renders correctly with all fields missing', () => {
    const partialMovieData: Movie = {
      id: 5,
      title: '',
      poster: '',
      releaseYear: NaN,
      overview: '',
      runtime: 0,
      genres: [],
      voteAverage: 0,
    };

    render(<MovieCard movie={partialMovieData} />);
    
    expect(screen.queryByText(/.*/)).toBeNull();
  });
});
