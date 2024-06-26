import { formatMovie, formatGenresToMap } from '../utils/transformers';

describe('formatMovie function', () => {
  it('should correctly format movie data from API', () => {
    const apiMovieData = {
      id: 123,
      title: 'Example Movie',
      poster_path: '/poster.jpg', 
      release_date: '2022-01-01',
      overview: 'This is an example movie.',
      genre_ids: [28, 12],
      vote_average: 8.5,
    };

    const formattedMovie = formatMovie(apiMovieData);

    expect(formattedMovie).toEqual({
      id: 123,
      title: 'Example Movie',
      poster: 'https://image.tmdb.org/t/p/w500/poster.jpg',
      releaseYear: 2022,
      overview: 'This is an example movie.',
      genres: [28, 12],
      voteAverage: 8.5,
    });
  });

  // Otras pruebas aquí...
});

describe('formatGenresToMap function', () => {
  it('should correctly transform an array of genres into a Map', () => {
    const genres = [
      { id: 28, name: 'Acción' },
      { id: 35, name: 'Comedia' },
      { id: 18, name: 'Drama' },
    ];

    const result = formatGenresToMap(genres);

    expect(result.get(28)).toBe('Acción');
    expect(result.get(35)).toBe('Comedia');
    expect(result.get(18)).toBe('Drama');
  });

  it('should return an empty Map when the input array is empty', () => {
    const genres: { id: number, name: string }[] = [];

    const result = formatGenresToMap(genres);

    expect(result.size).toBe(0);
  });

  it('should handle duplicate entries (last entry prevails)', () => {
    const genres = [
      { id: 28, name: 'Acción' },
      { id: 35, name: 'Comedia' },
      { id: 28, name: 'Aventura' }, // Duplicado
    ];

    const result = formatGenresToMap(genres);

    expect(result.get(28)).toBe('Aventura'); // La última entrada prevalece
    expect(result.get(35)).toBe('Comedia');
  });
});
