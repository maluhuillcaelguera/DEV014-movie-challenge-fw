import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import { Movie } from '../models/Movie';
import { APIService } from '../services/movies';
import '../styles/Home.css'; 

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await APIService.getMovies({ filters: { page: currentPage } });
        setMovies(response.movies);
        setCurrentPage(response.metaData.pagination.currentPage);
        setTotalPages(response.metaData.pagination.totalPages);
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
  }, [currentPage]);

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
      <div>
        <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}>
          Anterior
        </button>
        <span>{currentPage}</span>
        <button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
