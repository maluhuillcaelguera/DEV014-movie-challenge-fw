import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from '../components/MovieCard';
import { Movie } from '../models/Movie';

describe('MovieCard Component', () => {
  test('se muestra correctamente con todos los datos de la película', () => {
    const movie: Movie = {
      title: 'Inception',
      poster: 'https://example.com/inception.jpg',
      releaseYear: 2010
    };

    render(<MovieCard movie={movie} />);

    expect(screen.getByText('Inception')).toBeTruthy();
    expect(screen.getByText('2010')).toBeTruthy();
    expect(screen.getByAltText('Inception')).toHaveProperty('src', 'https://example.com/inception.jpg');
  });

  test('muestra "No Title" cuando falta el título', () => {
    const movie: Movie = {
      poster: 'https://example.com/placeholder.jpg',
      releaseYear: 2020
    };

    render(<MovieCard movie={movie} />);

    expect(screen.getByText('No Title')).toBeTruthy();
    expect(screen.getByText('2020')).toBeTruthy();
    expect(screen.getByAltText('No Title')).toHaveProperty('src', 'https://example.com/placeholder.jpg');
  });

  test('muestra "No Image" cuando falta la imagen', () => {
    const movie: Movie = {
      title: 'No Image Movie',
      releaseYear: 2021
    };

    render(<MovieCard movie={movie} />);

    expect(screen.getByText('No Image Movie')).toBeTruthy();
    expect(screen.getByText('2021')).toBeTruthy();
    expect(screen.getByAltText('No Image Movie')).toHaveProperty('src', 'https://example.com/no-image.jpg');
  });

  test('muestra "No Year" cuando falta el año de lanzamiento', () => {
    const movie: Movie = {
      title: 'Timeless Movie',
      poster: 'https://example.com/timeless.jpg'
    };

    render(<MovieCard movie={movie} />);

    expect(screen.getByText('Timeless Movie')).toBeTruthy();
    expect(screen.getByText('No Year')).toBeTruthy();
    expect(screen.getByAltText('Timeless Movie')).toHaveProperty('src', 'https://example.com/timeless.jpg');
  });
});
