// components/Home.tsx
import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import { Movie } from '../models/Movie';
import { APIService } from '../services/movies';
import './Home.css'; // Opcional: Añadir estilos CSS según sea necesario

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const fetchedMovies = await APIService.getMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Home">
      <h1>Mi Catálogo de Películas</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
