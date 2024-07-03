import { APIService } from '../services/movies';
import fetchMock from 'jest-fetch-mock';
jest.mock('node-fetch', () => require('jest-fetch-mock'));
fetchMock.enableMocks();

describe('APIService getMovies', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch movies with default sorting by popularity', async () => {
    const mockMovies = [{ id: 1, title: 'Movie 1', genre_ids: [28], release_date: '2021-01-01', vote_average: 8, poster_path: 'path1.jpg' }];
    fetchMock.mockResponseOnce(JSON.stringify({ results: mockMovies, total_pages: 1 }));

    const genreMap = new Map<number, string>();
    genreMap.set(28, 'Action');

    const response = await APIService.getMovies({ filters: { page: 1, genreId: null, sortBy: null } }, genreMap);
    
    expect(response.movies.length).toBe(1);
    expect(response.movies[0].title).toBe('Movie 1');
  });

  it('should fetch movies with genre filter', async () => {
    const mockMovies = [{ id: 1, title: 'Movie 1', genre_ids: [28], release_date: '2021-01-01', vote_average: 8, poster_path: 'path1.jpg' }];
    fetchMock.mockResponseOnce(JSON.stringify({ results: mockMovies, total_pages: 1 }));

    const genreMap = new Map<number, string>();
    genreMap.set(28, 'Action');

    const response = await APIService.getMovies({ filters: { page: 1, genreId: 28, sortBy: null } }, genreMap);

    expect(response.movies.length).toBe(1);
    expect(response.movies[0].title).toBe('Movie 1');
  });

  it('should fetch movies with sorting by release date', async () => {
    const mockMovies = [{ id: 1, title: 'Movie 1', genre_ids: [28], release_date: '2021-01-01', vote_average: 8, poster_path: 'path1.jpg' }];
    fetchMock.mockResponseOnce(JSON.stringify({ results: mockMovies, total_pages: 1 }));

    const genreMap = new Map<number, string>();
    genreMap.set(28, 'Action');

    const response = await APIService.getMovies({ filters: { page: 1, genreId: null, sortBy: 'release_date.desc' } }, genreMap);

    expect(response.movies.length).toBe(1);
    expect(response.movies[0].title).toBe('Movie 1');
  });
});
/*// src/services/movies.test.ts
import { APIService } from './movies';
import { formatMovie } from '../utils/transformers';

describe('APIService', () => {
  const genreMap = new Map<number, string>([
    [28, 'Action'],
    [35, 'Comedy'],
    [18, 'Drama'],
  ]);

  it('should fetch movies correctly', async () => {
    const params = {
      filters: {
        page: 1,
        genreId: null,
        sortBy: null,
      },
    };

    const response = await APIService.getMovies(params, genreMap);

    expect(response.movies).toHaveLength(2);
    expect(response.metaData.pagination.currentPage).toBe(1);
    expect(response.metaData.pagination.totalPages).toBe(2);

    // Check formatMovie transformation
    expect(response.movies[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        poster: expect.any(String),
        overview: expect.any(String),
        releaseYear: expect.any(Number),
        voteAverage: expect.any(Number),
        genres: expect.arrayContaining([expect.any(String)]),
      })
    );
  });

  it('should fetch movie genres correctly', async () => {
    const genres = await APIService.getMovieGenres();

    expect(genres).toHaveLength(3);
    expect(genres).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        }),
      ])
    );
  });
});
 */
