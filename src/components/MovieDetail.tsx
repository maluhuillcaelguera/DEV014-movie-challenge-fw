import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIService } from '../services/movies';
import { Movie } from '../models/Movie';
import Loader from './Loader';
import '../styles/MovieDetail.css';

interface MovieDetailProps {
  genreMap: Map<number, string>;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ genreMap }) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchMovieDetail = useCallback(
    async () => {
      if (!id) return
      try {
        setLoading(true);
        const movieDetail = await APIService.getMovieDetail(parseInt(id), genreMap);
        setMovie(movieDetail);
        console.log(movieDetail)
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    },
    []
  )

  useEffect(() => {
    if (id) {
      fetchMovieDetail();
    }
  }, [id, genreMap]);


  const handleGoBack = () => {
    window.history.back(); // Navega a la página anterior en el historial del navegador
  };

  if (!id) {
    return <div>No movie ID provided</div>;
  }

  if (loading) {
    return <Loader />; // Mostrar el componente Loader durante la carga
  }

  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return null;

  const { title, poster, overview, releaseYear, voteAverage, genres } = movie;

  // Verificar si genres está definido antes de renderizar
  const genresList = genres && genres.length > 0 ? (
    <div className="genres">
      <span>Genres: </span>
      {genres.map((genre, index) => (
        <span key={index}>{genre + ' '}</span>
      ))}
    </div>
  ) : null;
  return (
    <div className="movie-detail">
      <img src={poster} alt={title} />
      <div className="movie-detail-content">
        <h2>Title: {title}</h2>
        <p>Release year: {releaseYear}</p>
        <p>Rating: {voteAverage}</p>
        <p className="description">Description: {overview}</p>
        {genresList}
        <div className="button-container">
          <button className="back-button" onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
