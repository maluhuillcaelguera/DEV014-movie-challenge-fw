import { Movie } from '../models/Movie';

export const formatMovie = (data: any): Movie => {
  return {
    id: data.id,
    poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '',
    title: data.title || 'Unknown Title',
    overview: data.overview,
    releaseYear: data.release_date ? new Date(data.release_date + "T00:00:00").getFullYear() : 0,
    voteAverage: data.vote_average,
    genres:data.genre_ids,
  };
};

