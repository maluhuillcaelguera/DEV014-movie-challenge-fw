// src/models/Movie.d.ts

// Exportación del tipo Movie
export type Movie = {
    id ?: number;
    title ? : string;
    poster ? : string;
    releaseYear ?: number;
    overview ? : string;
    runtime ? : number; // Duración en minutos
    genres ? : string[]; // Array de géneros
    voteAverage ? : number; // Promedio de votos
  };
  
  