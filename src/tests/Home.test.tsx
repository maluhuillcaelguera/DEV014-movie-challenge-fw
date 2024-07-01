import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';
import { APIService } from '../services/movies';
import { Movie } from '../models/Movie';


jest.mock('../services/movieService', () => ({
  APIService: {
    getMovies: jest.fn(),
    getMovieGenres: jest.fn()
  }
}));

describe('Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el cargador mientras se obtienen los datos', async () => {
    (APIService.getMovies as jest.Mock).mockResolvedValue({
      metaData: {
        pagination: {
          currentPage: 1,
          totalPages: 1
        }
      },
      movies: []
    });

    (APIService.getMovieGenres as jest.Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Cargando...')).toBeTruthy(); // Verificar que el texto 'Cargando...' está en el documento

    await waitFor(() => {
      expect(screen.queryByText('Cargando...')).toBeNull(); // Verificar que el texto 'Cargando...' ya no está en el documento
    });
  });

  test('muestra correctamente las películas basadas en datos simulados', async () => {
    const mockMovies: Movie[] = [
      { id: 1, title: 'Película 1', poster: 'https://example.com/avatar-poster.jpg', releaseYear: 2020, overview: 'Overview 1', genres: ['Action'], voteAverage: 7.5 },
      { id: 2, title: 'Película 2', poster: 'https://example.com/avatar1-poster.jpg', releaseYear: 2021, overview: 'Overview 2', genres: ['Comedy'], voteAverage: 8.0 }
    ];

    (APIService.getMovies as jest.Mock).mockResolvedValue({
      metaData: {
        pagination: {
          currentPage: 1,
          totalPages: 1
        }
      },
      movies: mockMovies
    });

    (APIService.getMovieGenres as jest.Mock).mockResolvedValue([
      { id: 28, name: 'Action' },
      { id: 35, name: 'Comedy' }
    ]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Mi Catálogo de Películas')).toBeTruthy();
      mockMovies.forEach(movie => {
        if (movie.title) {
          expect(screen.getByText(movie.title)).toBeTruthy();
        }
        if (movie.poster) {
          expect(screen.getByAltText(movie.poster)).toBeTruthy();
        }
        if (movie.releaseYear) {
          expect(screen.getByText(movie.releaseYear.toString())).toBeTruthy();
        }
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
