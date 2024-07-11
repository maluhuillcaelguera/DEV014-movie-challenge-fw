// src/tests/movieservice.test.tsx
import { APIService } from '../services/movies';
import { formatMovie } from '../utils/transformers';
import { getToken } from '../utils/getEnv';

jest.mock('../utils/transformers', () => ({
  formatMovie: jest.fn((movie, genreMap) => ({ ...movie, genres: movie.genre_ids.map(id => genreMap.get(id)) }))
}));

jest.mock('../utils/getEnv', () => ({
  getToken: jest.fn().mockReturnValue('faketoken')
}));

const API_URL = 'https://api.themoviedb.org/3';

describe('APIService', () => {
  const genreMap = new Map<number, string>([[28, 'Action'], [12, 'Adventure']]);
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    global.fetch = jest.fn();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy.mockRestore();
  });

  it('should fetch movies successfully', async () => {
    const mockResponse = {
      results: [{ id: 1, title: 'Test Movie', genre_ids: [28] }],
      total_pages: 2
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const params = { filters: { page: 1, genreId: null, sortBy: null } };
    const result = await APIService.getMovies(params, genreMap);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/discover/movie?api_key=faketoken&page=1&sort_by=popularity.desc`);
    expect(result.metaData.pagination.currentPage).toBe(1);
    expect(result.metaData.pagination.totalPages).toBe(2);
    expect(result.movies).toHaveLength(1);
    expect(formatMovie).toHaveBeenCalledWith(mockResponse.results[0], genreMap);
  });

  it('should handle error when fetching movies', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const params = { filters: { page: 1, genreId: null, sortBy: null } };

    await expect(APIService.getMovies(params, genreMap)).rejects.toThrow('Failed to fetch movies');
  });

  it('should fetch genres successfully', async () => {
    const mockResponse = { genres: [{ id: 28, name: 'Action' }] };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await APIService.getMovieGenres();

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/genre/movie/list?api_key=faketoken`);
    expect(result).toEqual(mockResponse.genres);
  });

  it('should handle error when fetching genres', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(APIService.getMovieGenres()).rejects.toThrow('Failed to fetch genres');
  });

  it('should fetch movie detail successfully', async () => {
    const mockResponse = { id: 1, title: 'Test Movie', genre_ids: [28] };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await APIService.getMovieDetail(1, genreMap);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/movie/1?api_key=faketoken`);
    expect(result).toEqual(formatMovie(mockResponse, genreMap));
    expect(formatMovie).toHaveBeenCalledWith(mockResponse, genreMap);
  });

  it('should handle error when fetching movie detail', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(APIService.getMovieDetail(1, genreMap)).rejects.toThrow('Failed to fetch movie details');
  });
});
