// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import { APIService } from './services/movies'; // Asegúrate de importar correctamente
import { formatGenresToMap } from './utils/transformers';
import './App.css';

const App: React.FC = () => {
  const [genreMap, setGenreMap] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await APIService.getMovieGenres();
        setGenreMap(formatGenresToMap(genres));
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };

    fetchGenres();
  }, []);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail genreMap={genreMap} />} />
      </Routes>
    </Router>
  );
};

export default App;
