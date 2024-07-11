import React from 'react';
import { Movie } from '../models/Movie';
import { useNavigate } from 'react-router-dom';
import '../styles/MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { id, title, poster, releaseYear, genres, voteAverage } = movie;
  const navigate = useNavigate();

  

  const handleNavigate = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movie-card" >
      <img src={poster || "https://example.com/no-image.jpg"} alt={title || "No Title"} className="poster-image" />
      { (
        <div className="overlay">
          <h3>{title || "No Title"}</h3>
          <div className="year">
            <p>Año: {releaseYear || "No Year"}</p>
          </div>
          <div className="Rating">
            <p>Rating: {voteAverage || "No voteAverage"}</p>
          </div>
          <div className="genres">
            {genres && genres.length > 0 && (
              <ul>
                {genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            )}
          </div>
          <button name= "Ver más" className="more" onClick={handleNavigate}>Ver más</button>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
