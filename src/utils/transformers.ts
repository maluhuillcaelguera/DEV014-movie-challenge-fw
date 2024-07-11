import { Movie } from '../models/Movie';
import optionalPoster from '../assets/pelicula.jpeg';

export const formatMovie = (data: any, genreMap: Map<number, string>): Movie => {
  // const genres = data.genre_ids && data.genre_ids.map((id: number) => genreMap.get(id) || 'Unknown Genre');
  const genres = Array.isArray(data.genres)
    ? data.genres.map((genre: { id: number, name: string }) => genreMap.get(genre.id) || genre.name || 'Unknown Genre')
    :data.genre_ids ? data.genre_ids.map((id: number) => genreMap.get(id) || 'Unknown Genre') : [];
console.log(genreMap)
  return {
    id: data.id,
    poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : optionalPoster,
    title: data.title || 'Unknown Title',
    overview: data.overview,
    releaseYear: data.release_date ? new Date(data.release_date + "T00:00:00").getFullYear() : 0,
    voteAverage: data.vote_average,
    genres: genres,  // Utilizar los nombres de los géneros o un arreglo vacío si no hay datos
  };
};

export const formatGenresToMap = (genres: { id: number, name: string }[]): Map<number, string> => {
  const genreMap = new Map<number, string>();
  
  genres.forEach(genre => {
    genreMap.set(genre.id, genre.name);
  });

  return genreMap;
};

export const formatGenresToOptions = (genres: { id: number, name: string }[]): { value: string, label: string }[] => {
  return genres.map(genre => ({
    value: genre.id.toString(),
    label: genre.name
  }));
};
