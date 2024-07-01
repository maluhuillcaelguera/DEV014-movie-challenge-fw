import React from 'react';
import { Movie } from '../models/Movie'; 
import '../styles/MovieCard.css';
interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, poster,  releaseYear } = movie;

  return (
    <div className="movie-card">
      <img src={poster || "https://example.com/no-image.jpg"} alt={title || "No Title"} className="poster-image" />
      <h3>{title || "No Title"}</h3>
      <p>{releaseYear || "No Year"}</p>
    </div>
  );
}

export default MovieCard;