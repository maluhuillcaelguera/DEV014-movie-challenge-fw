import { Movie } from '../models/Movie';
import { formatMovie } from '../utils/transformers';

interface GetMoviesParams {
  filters: {
    page: number;
  };
}

interface MovieResponse {
  metaData: {
    pagination: {
      currentPage: number;
      totalPages: number;
    };
  };
  movies: Movie[];
}

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TOKEN_API;

export class APIService {
  static async getMovies(params: GetMoviesParams, genreMap: Map<number, string>): Promise<MovieResponse> {
    const { page } = params.filters;

    try {
      const response = await fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!data.results) {
        throw new Error('Unexpected API response structure');
      }

      const movies = data.results.map((movie: any) => formatMovie(movie, genreMap));
      const totalPages = data.total_pages || 1;

      return {
        metaData: {
          pagination: {
            currentPage: page,
            totalPages: totalPages
          }
        },
        movies: movies
      };
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }

  static async getMovieGenres(): Promise<{ id: number, name: string }[]> {
    try {
      const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`);

      if (!response.ok) {
        throw new Error('Failed to fetch movie genres');
      }

      const data = await response.json();

      if (!data.genres) {
        throw new Error('Unexpected API response structure');
      }

      return data.genres;
    } catch (error) {
      console.error('Error fetching movie genres:', error);
      throw error;
    }
  }
}
