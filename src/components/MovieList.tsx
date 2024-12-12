import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div
          className="movie-card"
          key={movie.imdbID}
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
        >
          <img
            className="movie-poster"
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
            alt={movie.Title}
          />
          <div className="movie-info">
            <h3 className="movie-title">{movie.Title}</h3>
            <p className="movie-year">{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
