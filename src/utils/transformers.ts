import { Movie } from '../models/Movie';

// Interfaz para los datos de la película de la API
interface APIMovieData {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  runtime: number;
  genres: { id: number; name: string }[];
  vote_average: number;
}

// Función para transformar los datos de la API al modelo de negocio Movie
export function formatMovie(apiMovieData: APIMovieData): Movie {
  // Realiza las conversiones o transformaciones necesarias para mapear los datos de la API al modelo Movie
  const formattedMovie: Movie = {
    id: apiMovieData.id,
    title: apiMovieData.title,
    poster: `https://image.tmdb.org/t/p/w500${apiMovieData.poster_path}`,
    releaseYear: new Date(apiMovieData.release_date + "T00:00:00").getFullYear(),
    overview: apiMovieData.overview,
    runtime: apiMovieData.runtime,
    genres: apiMovieData.genres.map((genre) => genre.name),
    voteAverage: apiMovieData.vote_average,
  };

  return formattedMovie;
}
