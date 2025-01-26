import React, { useState, useEffect,  Suspense, lazy} from 'react';
import {
  useParams,
  Link,
  Route,
  Routes,
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';
import styles from './moviedetails.module.css';
const Cast = lazy(() => import ('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

export const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
   const [error, setError] = useState(false);
  const apiKey = '331200659d05d0df9e6f90b4cf3e38f8';
  const { movieId } = useParams();
  const location = useLocation();
   const navigate = useNavigate();
    const backLink = location.state?.from || '/';

 useEffect(() => {
   const fetchApi = async () => {
     try {
       const response = await fetch(
         `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
       );
       if (!response.ok) {
         if (response.status === 404) {
           setError(true);
         }
         return;
       }
       const data = await response.json();
       setMovie(data);
     } catch (error) {
       console.error('Error fetching movie details:', error);
     }
   };

   fetchApi();
 }, [movieId]);

    useEffect(() => {
      if (error) {
        navigate('/NotFound'); // Переадресація
      }
    }, [error, navigate]);
  
 if (!movie) {
   return <p>Loading...</p>;
 }
  return (
    <>
      <Link to={backLink} className={styles.link}>
        ← Back
      </Link>
      <div className={styles.main_div}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.img}
          />
        </div>

        <div className={styles.main_content}>
          <h2>{`${movie.title} (${
            movie.release_date ? movie.release_date.split('-')[0] : 'N/A'
          })`}</h2>
          <p>Rating: {movie.vote_average}</p>
          <p className={styles.h}>Overview</p>
          <p>{movie.overview}</p>
          <p className={styles.h}>Genres</p>
          <ul className={styles.genres_list}>
            {movie.genres?.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.additional}>
        <p className={styles.p}>Additional information</p>
        <Link
          to={`/movies/${movieId}/cast`}
          state={{ from: backLink }}
          className={styles.link}
        >
          Cast
        </Link>
        <Link
          to={`/movies/${movieId}/reviews`}
          state={{ from: backLink }}
          className={styles.link}
        >
          Reviews
        </Link>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Outlet />} />
            <Route path="cast" element={<Cast movieId={movieId} />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
    
}

export default MovieDetails;