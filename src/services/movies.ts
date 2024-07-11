// src/services/movies.ts
import { Movie } from '../models/Movie';
import { formatMovie } from '../utils/transformers';
import { getToken } from '../utils/getEnv';

interface GetMoviesParams {
  filters: {
    page: number;
    genreId: number | null;
    sortBy: string | null;
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
const API_KEY = getToken();

export class APIService {
  static async getMovies(params: GetMoviesParams, genreMap: Map<number, string>): Promise<MovieResponse> {
    const { page, genreId, sortBy } = params.filters;
    
    // Construir la URL con los parámetros opcionales
    const genreFilter = genreId ? `&with_genres=${genreId}` : '';
    const sortCriteria = sortBy ? `&sort_by=${sortBy}` : '&sort_by=popularity.desc';

    try {
      const response = await fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&page=${page}${genreFilter}${sortCriteria}`);

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

  static async getMovieGenres(): Promise<{ id: number; name: string }[]> {
    try {
      const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }

      const data = await response.json();
      console.log('Genres API Response:', data);

      return data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }

  static async getMovieDetail(id: number, genreMap: Map<number, string>): Promise<Movie> {
    try {
      const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`);

      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      const data = await response.json();
      return formatMovie(data, genreMap);
      
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }
}
