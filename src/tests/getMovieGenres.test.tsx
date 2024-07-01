import { APIService } from '../services/movies';
import fetchMock from 'jest-fetch-mock';
import { formatGenresToMap } from '../utils/transformers';

jest.mock('node-fetch', () => require('jest-fetch-mock'));

describe('APIService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('getMovieGenres', () => {
    it('should return an array of genres on successful API call', async () => {
      const mockGenres = [
        { id: 1, name: 'Acción' },
        { id: 2, name: 'Comedia' }
      ];

      fetchMock.mockResponseOnce(JSON.stringify({ genres: mockGenres }));

      const genres = await APIService.getMovieGenres();
      expect(genres).toEqual(mockGenres);
    });

    it('should throw an error when the API call fails', async () => {
      fetchMock.mockReject(new Error('Network error'));

      await expect(APIService.getMovieGenres()).rejects.toThrow('Failed to fetch movie genres');
    });

    it('should throw an error when the API response structure is unexpected', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ unexpectedKey: [] }));

      await expect(APIService.getMovieGenres()).rejects.toThrow('Unexpected API response structure');
    });
  });

  describe('getMovies', () => {
    it('should correctly format movies with genres', async () => {
      const mockMovies = [
        {
          id: 1,
          title: 'Movie 1',
          poster_path: '/poster1.jpg',
          release_date: '2022-01-01',
          overview: 'Overview 1',
          genre_ids: [28, 35],
          vote_average: 7.5
        },
        {
          id: 2,
          title: 'Movie 2',
          poster_path: '/poster2.jpg',
          release_date: '2021-01-01',
          overview: 'Overview 2',
          genre_ids: [18],
          vote_average: 8.0
        }
      ];

      const mockGenreMap = formatGenresToMap([
        { id: 28, name: 'Action' },
        { id: 35, name: 'Comedy' },
        { id: 18, name: 'Drama' }
      ]);

      fetchMock.mockResponses(
        [JSON.stringify({ results: mockMovies, total_pages: 1 }), { status: 200 }],
        [JSON.stringify({ genres: [{ id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }, { id: 18, name: 'Drama' }] }), { status: 200 }]
      );

      const response = await APIService.getMovies({ filters: { page: 1 } }, mockGenreMap);

      expect(response.movies).toEqual([
        {
          id: 1,
          title: 'Movie 1',
          poster: 'https://image.tmdb.org/t/p/w500/poster1.jpg',
          releaseYear: 2022,
          overview: 'Overview 1',
          genres: ['Action', 'Comedy'],
          voteAverage: 7.5
        },
        {
          id: 2,
          title: 'Movie 2',
          poster: 'https://image.tmdb.org/t/p/w500/poster2.jpg',
          releaseYear: 2021,
          overview: 'Overview 2',
          genres: ['Drama'],
          voteAverage: 8.0
        }
      ]);
    });

    // Más pruebas para errores y otras condiciones
  });
});
