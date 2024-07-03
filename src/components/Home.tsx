// src/components/Home.tsx

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from './MovieList';
import { Movie } from '../models/Movie';
import { APIService } from '../services/movies'; // Asegúrate de importar desde la ubicación correcta
import { formatGenresToMap, formatGenresToOptions } from '../utils/transformers';
import Pagination from './Pagination';
import ListOptions from './ListOptions';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<{ value: string, label: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
  const selectedGenre = searchParams.get('genreId');
  const selectedSort = searchParams.get('sortBy');

  const sortOptions = [
    { value: 'popularity.desc', label: 'Popularidad' },
    { value: 'release_date.desc', label: 'Fecha de lanzamiento' },
    { value: 'vote_average.desc', label: 'Calificación' },
  ];

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        setLoading(true);
        const genresResponse = await APIService.getMovieGenres(); // Aquí deberías obtener los géneros usando APIService
        const genreOptions = formatGenresToOptions(genresResponse);
        setGenres(genreOptions);

        const genreMap = formatGenresToMap(genresResponse); // Asegúrate de tener esta función implementada correctamente
        const response = await APIService.getMovies({
          filters: {
            page: currentPage,
            genreId: selectedGenre ? parseInt(selectedGenre, 10) : null,
            sortBy: selectedSort || null
          }
        }, genreMap);
        
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
  }, [currentPage, selectedGenre, selectedSort]);

  const handlePageSelect = (page: number) => {
    setSearchParams({ currentPage: page.toString(), genreId: selectedGenre || '', sortBy: selectedSort || '' });
  };

  const handleGenreChange = (option: { value: string, label: string } | null) => {
    setSearchParams({ currentPage: '1', genreId: option?.value || '', sortBy: selectedSort || '' });
  };

  const handleSortChange = (option: { value: string, label: string } | null) => {
    setSearchParams({ currentPage: '1', genreId: selectedGenre || '', sortBy: option?.value || '' });
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
      <ListOptions 
        options={genres} 
        selectedOption={genres.find(option => option.value === selectedGenre) || null} 
        onChange={handleGenreChange} 
        onClear={() => handleGenreChange(null)} 
      />
      <ListOptions 
        options={sortOptions} 
        selectedOption={sortOptions.find(option => option.value === selectedSort) || null} 
        onChange={handleSortChange} 
        onClear={() => handleSortChange(null)} 
      />
      <MovieList movies={movies} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onSelectPage={handlePageSelect} />
    </div>
  );
};

export default Home;
