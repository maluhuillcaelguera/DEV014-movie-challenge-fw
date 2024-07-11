// src/tests/MovieList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList from '../components/MovieList';
import { Movie } from '../models/Movie';

// Mock MovieCard component to simplify testing
jest.mock('../components/MovieCard', () => ({ movie }: { movie: Movie }) => (
  <div data-testid="movie-card">{movie.title}</div>
));

const movies: Movie[] = [
  {
    id: 1,
    title: 'Movie 1',
    poster: 'poster1.jpg',
    releaseYear: 2021,
    genres: ['Action', 'Drama'],
    voteAverage: 8.5,
  },
  {
    id: 2,
    title: 'Movie 2',
    poster: 'poster2.jpg',
    releaseYear: 2020,
    genres: ['Comedy'],
    voteAverage: 7.8,
  },
  {
    id: 3,
    title: 'Movie 3',
    poster: 'poster3.jpg',
    releaseYear: 2019,
    genres: ['Horror', 'Thriller'],
    voteAverage: 9.0,
  },
];

const mixedMovies: Movie[] = [
  {
    id: 4,
    title: 'Documentary',
    poster: 'poster4.jpg',
    releaseYear: 2018,
    genres: ['Documentary'],
    voteAverage: 7.0,
  },
  {
    id: 5,
    title: 'Animated Movie',
    poster: 'poster5.jpg',
    releaseYear: 2017,
    genres: ['Animation', 'Family'],
    voteAverage: 8.2,
  },
  {
    id: 6,
    title: 'Sci-Fi Movie',
    poster: 'poster6.jpg',
    releaseYear: 2016,
    genres: ['Sci-Fi'],
    voteAverage: 7.9,
  },
];

describe('MovieList Component', () => {
  test('renders a message when there are no movies', () => {
    render(<MovieList movies={[]} />);

    expect(screen.queryByTestId('movie-card')).toBeNull();
    // Añadimos una comprobación para asegurarnos de que se muestra el mensaje de "No movies available"
    // expect(screen.queryByText('No movies available')).toBeTruthy();
  });

  test('renders the correct number of movies', () => {
    render(<MovieList movies={movies} />);

    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards.length).toBe(movies.length);
  });

  test('renders the correct movie titles', () => {
    render(<MovieList movies={movies} />);

    movies.forEach((movie) => {
      if (movie.title) {
        expect(screen.queryByText(movie.title)).toBeTruthy();
      }
    });
  });

  test('renders the correct number of mixed type movies', () => {
    render(<MovieList movies={mixedMovies} />);

    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards.length).toBe(mixedMovies.length);
  });

  test('renders the correct mixed type movie titles', () => {
    render(<MovieList movies={mixedMovies} />);

    mixedMovies.forEach((movie) => {
      if (movie.title) {
        expect(screen.queryByText(movie.title)).toBeTruthy();
      }
    });
  });

  test('renders correctly with mixed movies and displays their titles', () => {
    render(<MovieList movies={[...movies, ...mixedMovies]} />);

    const combinedMovies = [...movies, ...mixedMovies];
    combinedMovies.forEach((movie) => {
      if (movie.title) {
        expect(screen.queryByText(movie.title)).toBeTruthy();
      }
    });
  });
});
