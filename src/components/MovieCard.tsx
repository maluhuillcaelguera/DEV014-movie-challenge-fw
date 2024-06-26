import React from 'react';
import { Movie } from '../models/Movie'; 
import '../styles/MovieCard.css';
interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, poster} = movie;

  return (
    <div className="movie-card">
      <img src={poster} alt={title} className="poster-image" />
      <h3>{title}</h3>
    </div>
  );
}

export default MovieCard;