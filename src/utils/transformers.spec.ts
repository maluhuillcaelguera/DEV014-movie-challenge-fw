// src/utils/transformers.spec.ts

import { formatMovie } from './transformers';

describe('formatMovie function', () => {
  it('should correctly format movie data from API', () => {
    const apiMovieData = {
      id: 123,
      title: 'Example Movie',
      poster_path: '/poster.jpg', // Agrega poster_path
      release_date: '2022-01-01',
      overview: 'This is an example movie.',
      runtime: 120,
      genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }],
      vote_average: 8.5,
    };

    const formattedMovie = formatMovie(apiMovieData);

    expect(formattedMovie).toEqual({
      id: 123,
      title: 'Example Movie',
      poster: 'https://image.tmdb.org/t/p/w500/poster.jpg',
      releaseYear: 2022,
      overview: 'This is an example movie.',
      runtime: 120,
      genres: ['Action', 'Adventure'],
      voteAverage: 8.5,
    });
  });

  // Otras pruebas aquí...
});
