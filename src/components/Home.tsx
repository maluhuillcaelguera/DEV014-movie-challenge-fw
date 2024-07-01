import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import { Movie } from '../models/Movie';
import { APIService } from '../services/movies';
import { formatGenresToMap } from '../utils/transformers';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';
import '../styles/Home.css'; 

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        setLoading(true);
        const genres = await APIService.getMovieGenres();
        const genreMap = formatGenresToMap(genres);
        const response = await APIService.getMovies({ filters: { page: currentPage } }, genreMap);
        setMovies(response.movies);
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

    fetchGenresAndMovies();
  }, [currentPage]);

  const handlePageSelect = (page: number) => {
    setSearchParams({ currentPage: page.toString() });
  };

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
      <Pagination currentPage={currentPage} totalPages={totalPages} onSelectPage={handlePageSelect} />
    </div>
  );
};

export default Home;
