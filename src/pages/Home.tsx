import React, { Component } from 'react';
import { fetchAllMovies } from '../services/api';
import MovieList from '../components/MovieList';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/home.css';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface HomeState {
  movies: Movie[];
  loading: boolean;
  searchTerm: string; // For dynamic search
}

class Home extends Component<{}, HomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      searchTerm: 'marvel', // Default search term
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    const data = await fetchAllMovies(searchTerm); // Fetch movies dynamically
    this.setState({
      movies: data.Search || [],
      loading: false,
    });
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.getMovies(); // Re-fetch movies on search
  };

  renderSkeleton = () => {
    return (
      <div className="skeleton-list">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div className="skeleton-item" key={index}>
              <Skeleton height={300} width={200} />
              <Skeleton height={20} width={150} style={{ margin: '10px 0' }} />
              <Skeleton height={20} width={100} />
            </div>
          ))}
      </div>
    );
  };

  render() {
    const { loading, movies, searchTerm } = this.state;

    return (
      <div className="home-page">
        <h1>Welcome to Netflix Clone!</h1>

        {/* Search Input */}
        <form onSubmit={this.handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={this.handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {loading && this.renderSkeleton()}

        {!loading && movies.length === 0 && (
          <div className="no-movies">
            <h2>Sorry, no movies found.</h2>
          </div>
        )}

        {!loading && movies.length > 0 && <MovieList movies={movies} />}
      </div>
    );
  }
}

export default Home;
