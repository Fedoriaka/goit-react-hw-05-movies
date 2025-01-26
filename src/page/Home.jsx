import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css'
export const Home = () => {
    const [movies, setMovies] = useState([]);
    const apiKey = '331200659d05d0df9e6f90b4cf3e38f8';

    const fetchApi = () => {
        fetch(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
        )
            .then(res => res.json())
            .then((res) => {
                 const filteredMovies = res.results.filter(
                   movie => movie.title || movie.original_title
                 );
                 setMovies(filteredMovies);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchApi();
    });

    return (
      <>
        <h1>Trending today</h1>
        <ul className={styles.list}>
          {movies.map(movie => (
            <li key={movie.id}>
              {movie.title && (
                <Link to={`/movies/${movie.id}`} className = {styles.link}>
                  {movie.title} 
                </Link>
              )}
            </li>
          ))}
        </ul>
      </>
    );
}

export default Home;