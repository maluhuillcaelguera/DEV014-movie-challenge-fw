/*import { Movie } from '../models/Movie';
import { formatMovie } from '../utils/transformers';


const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = import.meta.env.VITE_TOKEN_API;

export class APIService {
  static async getMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(`${API_URL}?api_key=${API_KEY}&sort_by=popularity.desc`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!data.results) {
        throw new Error('Unexpected API response structure');
      }

      return data.results.map((movie: any) => formatMovie(movie));
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }
}*/
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

const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = import.meta.env.VITE_TOKEN_API;

export class APIService {
  static async getMovies(params: GetMoviesParams): Promise<MovieResponse> {
    const { page } = params.filters;

    try {
      const response = await fetch(`${API_URL}?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!data.results) {
        throw new Error('Unexpected API response structure');
      }

      const movies = data.results.map((movie: any) => formatMovie(movie));
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
}


