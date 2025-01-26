import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Reviews = () => {
  const { movieId } = useParams();
 const [reviews, setReviews] = useState([]);
  const apiKey = '331200659d05d0df9e6f90b4cf3e38f8';
  const fetchApi = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
      );
      const data = await response.json();
      setReviews(data.results || []);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [movieId]);

 if (!reviews || reviews.length === 0) {
   return <p>No reviews available for this movie.</p>;
 }
    
    return (
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p> <strong>Author:</strong> { review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    );
};

export default Reviews;
