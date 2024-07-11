import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { Movie } from '../models/Movie';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockMovie: Movie = {
  id: 1,
  title: 'Mock Movie',
  poster: 'mockPoster.jpg',
  releaseYear: 2021,
  genres: ['Action', 'Drama'],
  voteAverage: 8.5,
};
  });
});

