import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

export const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || ''); // Ініціалізуємо query з URL
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Викликається щоразу, коли змінюється query
  useEffect(() => {
    const currentQuery = searchParams.get('query') || '';
      setQuery(currentQuery);
    if (!currentQuery) {
      setMovies([]); // Очищаємо список фільмів, якщо query порожній
      return;
    }

    const fetchMovies = async () => {
      const apiKey = '331200659d05d0df9e6f90b4cf3e38f8';
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${currentQuery}`
        );
        const data = await response.json();
        setMovies(data.results || []);
        setError(null);
      } catch (err) {
        setError('Something went wrong. Please try again.');
      }
    };

    fetchMovies();
  }, [searchParams]); // Залежність від searchParams

  const handleInputChange = ev => {
    setQuery(ev.target.value); // Оновлюємо локальний стан
  };

  const handleSearch = () => {
    setSearchParams(query ? { query } : {}); // Встановлюємо або очищуємо параметр query в URL
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange} // Оновлюємо query при введенні тексту
      />
      <button onClick={handleSearch}>Search</button> {error && <p>{error}</p>}
      {!error && movies.length === 0 && query && (
        <p>No movies found for "{query}".</p>
      )}
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
