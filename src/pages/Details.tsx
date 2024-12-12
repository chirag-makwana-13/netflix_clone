import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the movieId from the URL
import { fetchMovies } from '../services/api'; // Import the fetchMovies function
import '../styles/global.css'; // Optional styling for the details page

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the movieId from the URL params
  const [movie, setMovie] = useState<any | null>(null); // State to store movie details
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        // Fetch movie details from OMDb API using the imdbID (movieId)
        const data = await fetchMovies(`?i=${id}`);
        setMovie(data); // Set the movie details in state
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails(); // Call the fetch function when the component is mounted
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="skeleton-loader"></div>
        <p></p>
      </div>
    );
  }


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="movie-details"> 
      {loading && <div className="loader">Loading...</div>}

      {!loading && error && (
        <div className="error-page">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && movie && movie.Response === "True" ? (
        <>
          <h2>{movie.Title} ({movie.Year})</h2>
          <img src={movie.Poster} alt={movie.Title} />
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </>
      ) : (
          <div className="error-page">
            <h2>Movie Not Found</h2>
            <p>The movie you're looking for does not exist or the ID is incorrect.</p>
          </div>
      )}
    </div>
  );
};

export default Details;
