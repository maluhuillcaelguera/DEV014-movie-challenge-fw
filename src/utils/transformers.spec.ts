import { formatMovie } from './transformers';

describe('formatMovie function', () => {
  it('should correctly format movie data from API', () => {
    const apiMovieData = {
      id: 123,
      title: 'Example Movie',
      poster_path: 'https://image.tmdb.org/t/p/w500/poster.jpg', 
      release_date: '2022-01-01',
      overview: 'This is an example movie.',
      genre_ids: ['Action', 'Adventure'],
      vote_average: 8.5,
    };

    const formattedMovie = formatMovie(apiMovieData);

    expect(formattedMovie).toEqual({
      id: 123,
      title: 'Example Movie',
      poster: 'https://image.tmdb.org/t/p/w500/poster.jpg',
      releaseYear: 2022,
      overview: 'This is an example movie.',
      genres: ['Action', 'Adventure'],
      voteAverage: 8.5,
    });
  });

  // Otras pruebas aquí...
});
