import { render, screen, waitFor } from '@testing-library/react';
import Home from '../components/Home';
import { APIService } from '../services/movies';
import { Movie } from '../models/Movie';

// Mock de la API
jest.mock('../services/movies', () => ({
  APIService: {
    getMovies: jest.fn()
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

    render(<Home />);

    expect(screen.getByText('Cargando...')).toBeTruthy(); // Verificar que el texto 'Cargando...' está en el documento

    await waitFor(() => {
      expect(screen.queryByText('Cargando...')).toBeNull(); // Verificar que el texto 'Cargando...' ya no está en el documento
    });
  });

  test('muestra correctamente las películas basadas en datos simulados', async () => {
    const mockMovies: Movie[] = [
      { id: 1, title: 'Película 1', overview: 'Descripción 1' },
      { id: 2, title: 'Película 2', overview: 'Descripción 2' }
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

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Mi Catálogo de Películas')).toBeTruthy(); // Verificar que el texto 'Mi Catálogo de Películas' está en el documento
      mockMovies.forEach(movie => {
        if (movie.title) {
          expect(screen.getByText(movie.title)).toBeTruthy(); // Verificar que el título de cada película está en el documento
        }
        if (movie.overview) {
          expect(screen.getByText(movie.overview)).toBeTruthy(); // Verificar que la descripción (overview) de cada película está en el documento
        }
      });
    });
  });

  test('muestra un mensaje de error cuando la API falla', async () => {
    const errorMessage = 'Failed to fetch movies';
    (APIService.getMovies as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeTruthy(); // Verificar que el mensaje de error está en el documento
    });
  });
});
