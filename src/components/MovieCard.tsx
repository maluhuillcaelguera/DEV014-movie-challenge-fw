// MovieCard.tsx
import React from 'react';
import { Movie } from '../models/Movie'; // Importa el modelo Movie si lo tienes definido

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, poster, overview, releaseYear } = movie;

  return (
    <div className="movie-card">
      <img src={poster} alt={title} />
      <h3>{title}</h3>
      <p>{overview}</p>
      <p>{releaseYear}</p>
    </div>
  );
}

export default MovieCard;
