import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './cast.module.css';

export const Cast = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState();
    const apiKey = '331200659d05d0df9e6f90b4cf3e38f8';
    const fetchApi = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
            );
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };
  
        useEffect(() => {
            fetchApi();
        }, [movieId]);
    if (!movie) {
      return <p>Loading cast details...</p>;
    }
  
     if (!movie.cast || movie.cast.length === 0) {
       return <p>No cast available for this movie.</p>;
     }
    
      // if (!movie || !movie.cast) {
      //   return <p>Loading cast details...</p>;
      // }
    

    return (
      <ul className={styles.cast_list}>
        {movie.cast.map(cast => (
          <li className={styles.list_item} key={cast.id}>
            {cast.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt={cast.name}
                className={styles.img_cast}
              />
            ) : (
              <div className={styles.noImage}>No Image</div>
            )}
            {/* <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'
              }
              alt={cast.name}
              className={styles.img_cast}
            /> */}
            <p className={styles.p}>{cast.name}</p>
            <p className={styles.p}>Character: {cast.character}</p>
          </li>
        ))}
      </ul>
    );
};

export default Cast;
