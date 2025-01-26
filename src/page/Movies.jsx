import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import styles from './home.module.css';
export const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || ''); // Ініціалізуємо query з URL
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const location = useLocation();

  
  useEffect(() => {
   
    const currentQuery = searchParams.get('query') || '';
    setQuery(currentQuery);
    if (!currentQuery) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      const apiKey = '331200659d05d0df9e6f90b4cf3e38f8';
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${currentQuery}`
        );
        const data = await response.json();
        setMovies(data.results || []); // Оновлюємо результати пошуку
        setError(null); // Очищуємо попередні помилки
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false); // Завантаження завершено
      }
    };

    fetchMovies();

  }, [searchParams]);
  
  const handleInputChange = ev => {
    setQuery(ev.target.value);
     setSearched(false);
  };
const handleSearch = () => {
  setSearchParams(query ? { query } : {});
  setSearched(true);
};

  return (
    <div>
      <h1>Search Movies</h1>
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}{' '}
      {error && <p>{error}</p>} 
      {!loading && !error && searched && movies.length === 0 && query && (
        <p>No movies found for "{query}".</p>
      )}
      <ul className={styles.list}>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }} className={styles.link}>
              {' '}
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;