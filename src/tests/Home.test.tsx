import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';
import { APIService } from '../services/movies';

jest.mock('../services/movies');

const mockGenresResponse = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
];

const mockMoviesResponse = {
  movies: [
    {
      id: 1,
      title: 'Movie 1',
      poster_path: '/path/to/poster1.jpg',
      release_date: '2020-01-01',
      overview: 'Overview of movie 1',
      runtime: 120,
      genres: [1, 2],
      vote_average: 8.0,
    },
    {
      id: 2,
      title: 'Movie 2',
      poster_path: '/path/to/poster2.jpg',
      release_date: '2021-01-01',
      overview: 'Overview of movie 2',
      runtime: 90,
      genres: [1],
      vote_average: 7.5,
    },
  ],
  metaData: {
    pagination: {
      totalPages: 10,
    },
  },
};

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render loader initially', async () => {
    // Simula una promesa que nunca se resuelve para mantener el estado de carga
    jest.spyOn(APIService, 'getMovieGenres').mockImplementation(() => new Promise(() => {}));
    jest.spyOn(APIService, 'getMovies').mockImplementation(() => new Promise(() => {}));
  
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should render movies and genres', async () => {
  await act( async () => {
      (APIService.getMovieGenres as jest.Mock).mockResolvedValue(mockGenresResponse);
      (APIService.getMovies as jest.Mock).mockResolvedValue(mockMoviesResponse);

      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Mi Catálogo de Películas/i)).toBeInTheDocument();
      mockMoviesResponse.movies.forEach((movie) => {
        expect(screen.getByText(movie.title)).toBeInTheDocument();
      });
    });
  });

  test('muestra un mensaje de error cuando la API falla', async () => {
    const errorMessage = 'Failed to fetch movies';
    (APIService.getMovies as jest.Mock).mockRejectedValue(new Error(errorMessage));
    (APIService.getMovieGenres as jest.Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeTruthy(); // Verificar que el mensaje de error está en el documento
    });
  });
});
