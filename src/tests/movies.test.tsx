// src/services/movieservice.test.ts
import { APIService } from '../services/movies';
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'hjwebfhwbfhvbweufuwe'; // Usa una clave API ficticia para las pruebas

global.fetch = jest.fn();

describe('APIService', () => {
  const genreMap = new Map<number, string>([
    [28, 'Action'],
    [35, 'Comedy'],
    [18, 'Drama'],
  ]);

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('getMovies', () => {
    it('should fetch movies correctly', async () => {
      const mockResponse = {
        results: [
          { id: 1, title: 'Test Movie 1', genre_ids: [28, 35], release_date: '2023-01-01', vote_average: 7.5 },
          { id: 2, title: 'Test Movie 2', genre_ids: [18], release_date: '2023-02-01', vote_average: 8.0 },
        ],
        total_pages: 10,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = {
        filters: {
          page: 1,
          genreId: null,
          sortBy: null,
        },
      };

      const response = await APIService.getMovies(params, genreMap);

      expect(response.movies).toEqual([
        {
          id: 1,
          title: 'Test Movie 1',
          genres: ['Action', 'Comedy'],
          releaseYear: 2023,
          voteAverage: 7.5,
        },
        {
          id: 2,
          title: 'Test Movie 2',
          genres: ['Drama'],
          releaseYear: 2023,
          voteAverage: 8.0,
        },
      ]);
      expect(response.metaData.pagination.currentPage).toBe(1);
      expect(response.metaData.pagination.totalPages).toBe(10);
    });

    it('should handle error when fetching movies', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const params = {
        filters: {
          page: 1,
          genreId: null,
          sortBy: null,
        },
      };

      await expect(APIService.getMovies(params, genreMap)).rejects.toThrow('Failed to fetch movies');
    });

    it('should apply genre filter and sort criteria', async () => {
      const mockResponse = {
        results: [
          { id: 1, title: 'Test Movie 1', genre_ids: [28, 35], release_date: '2023-01-01', vote_average: 7.5 },
          { id: 2, title: 'Test Movie 2', genre_ids: [18], release_date: '2023-02-01', vote_average: 8.0 },
        ],
        total_pages: 10,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = {
        filters: {
          page: 1,
          genreId: 28,
          sortBy: 'release_date.desc',
        },
      };

      const response = await APIService.getMovies(params, genreMap);

      expect(response.movies).toEqual([
        {
          id: 1,
          title: 'Test Movie 1',
          genres: ['Action', 'Comedy'],
          releaseYear: 2023,
          voteAverage: 7.5,
        },
        {
          id: 2,
          title: 'Test Movie 2',
          genres: ['Drama'],
          releaseYear: 2023,
          voteAverage: 8.0,
        },
      ]);
    });
  });

  describe('getMovieGenres', () => {
    it('should fetch movie genres correctly', async () => {
      const mockResponse = {
        genres: [
          { id: 28, name: 'Action' },
          { id: 35, name: 'Comedy' },
          { id: 18, name: 'Drama' },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const genres = await APIService.getMovieGenres();

      expect(genres).toEqual([
        { id: 28, name: 'Action' },
        { id: 35, name: 'Comedy' },
        { id: 18, name: 'Drama' },
      ]);
    });

    it('should handle error when fetching movie genres', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(APIService.getMovieGenres()).rejects.toThrow('Failed to fetch genres');
    });
  });

  describe('getMovieDetail', () => {
    it('should fetch movie details correctly', async () => {
      const mockResponse = {
        id: 1,
        title: 'Test Movie 1',
        genres: [{ id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }],
        release_date: '2023-01-01',
        vote_average: 7.5,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const movieId = 1;
      const movie = await APIService.getMovieDetail(movieId, genreMap);

      expect(movie).toEqual({
        id: 1,
        title: 'Test Movie 1',
        genres: ['Action', 'Comedy'],
        releaseYear: 2023,
        voteAverage: 7.5,
      });
    });

    it('should handle error when fetching movie details', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const movieId = 1;

      await expect(APIService.getMovieDetail(movieId, genreMap)).rejects.toThrow('Failed to fetch movie details');
    });
  });
});
