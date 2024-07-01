import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../models/Movie';

describe('MovieCard Component', () => {
  const movieData: Movie = {
    id: 1,
    title: 'Avatar',
    releaseYear: 2009,
    poster: 'https://example.com/avatar-poster.jpg'
  };

  it('renders movie information correctly', () => {
    render(<MovieCard movie={movieData} />);

    expect(screen.getByAltText('Avatar')).toBeTruthy(); // Busca la imagen por el atributo alt
    expect(screen.getByText('Avatar')).toBeTruthy(); // Busca el título de la película
    expect(screen.getByText('2009')).toBeTruthy(); // Busca el año de lanzamiento
  });
});
