import axios from 'axios';

const API_KEY = 'bbd5ad5d';
const BASE_URL = 'https://www.omdbapi.com/';

// Function to fetch movies
export const fetchMovies = async (endpoint: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { Search: [] }; // Return an empty array if there's an error
  }
};

// Helper function to fetch all movies based on a dynamic search term
export const fetchAllMovies = async (searchTerm: string = 'marvel') => {
  return fetchMovies(`?s=${searchTerm}`); // Default search for "marvel"
};
