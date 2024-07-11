import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { Movie } from '../models/Movie';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockMovie: Movie = {
  id: 1,
  title: 'Mock Movie',
  poster: 'mockPoster.jpg',
  releaseYear: 2021,
  genres: ['Action', 'Drama'],
  voteAverage: 8.5,
};

describe('MovieCard Component', () => {
  test('navigates to movie detail page on click', async () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    // Esperar a que el botón "Ver más" esté presente
    await waitFor(() => {
      expect(screen.getByText('Ver más')).toBeInTheDocument();
    });

    // Simular el clic en el botón "Ver más"
    fireEvent.click(screen.getByText('Ver más'));

    // Verificar que navigate se llamó con el path correcto
    expect(navigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });
});
