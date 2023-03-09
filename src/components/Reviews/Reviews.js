import React from 'react';

export const Reviews = ({ reviews }) => {
  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map(review => (
          <li>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
