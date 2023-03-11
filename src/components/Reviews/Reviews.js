import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchReviews } from 'components/TMDB-Api/FetchMovies';
import { Loader } from 'components/Loader/Loader';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  // obsługa zapytania o reviews filmu
  const handleReviews = async () => {
    setIsLoading(true);
    setReviews([]);

    try {
      const movieReviews = await fetchReviews(movieId);
      const reviewsData = [];
      movieReviews.map(review => {
        const reviewData = {
          author: review.author,
          content: review.content,
        };

        reviewsData.push(reviewData);
      });
      setReviews(reviewsData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.author}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
        {reviews.length === 0 && <p>There is no reviews</p>}
      </ul>
      {isLoading && <Loader />}
    </div>
  );
};

export default Reviews;
