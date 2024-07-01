import { Movie } from '../models/Movie';

export const formatMovie = (data: any, genreMap: Map<number, string>): Movie => {
  const genres = data.genre_ids.map((id: number) => genreMap.get(id) || 'Unknown Genre');

  return {
    id: data.id,
    poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '',
    title: data.title || 'Unknown Title',
    overview: data.overview,
    releaseYear: data.release_date ? new Date(data.release_date + "T00:00:00").getFullYear() : 0,
    voteAverage: data.vote_average,
    genres: genres,  // Utilizar los nombres de los géneros
  };
};

export const formatGenresToMap = (genres: { id: number, name: string }[]): Map<number, string> => {
  const genreMap = new Map<number, string>();
  
  genres.forEach(genre => {
    genreMap.set(genre.id, genre.name);
  });

  return genreMap;
};
