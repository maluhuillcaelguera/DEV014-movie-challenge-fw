import React from 'react';
import { Movie } from '../models/Movie'; 
import './MovieCard.css';
interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, poster,  releaseYear } = movie;

  return (
    <div className="movie-card">
      <img src={poster} alt={title} className="poster-image" />
      <h3>{title}</h3>
      <p>{releaseYear}</p>
    </div>
  );
}

export default MovieCard;