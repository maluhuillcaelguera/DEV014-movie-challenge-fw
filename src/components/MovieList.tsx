import { Movie } from '../models/Movie'; 
import MovieCard from './MovieCard'; 
import './MovieList.css';

type MovieListProps = {
  movies: Movie[];
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    
    return (
      <div className="movie-list">
        
       
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
       
      </div>
    );
  };
  
  export default MovieList;
