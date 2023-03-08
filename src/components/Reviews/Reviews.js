import React from 'react';
import { useEffect } from 'react';
import { fetchTrending } from 'components/TMDB-Api/FetchMovies';

export const Reviews = () => {
  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        <li>
          Example review Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. In pretium diam et erat fermentum, ut dignissim lectus rhoncus.
          Maecenas posuere sem eget ex scelerisque, in blandit ligula dictum.
          Praesent efficitur ipsum a lacus vulputate, eget laoreet risus
          dapibus. Vestibulum ac sapien libero. Sed nec ante turpis. Nullam
          vestibulum mattis semper. Fusce et imperdiet tellus. Sed in ornare
          risus. Sed tincidunt eros at justo iaculis euismod.
        </li>
        <li>
          Example review Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. In pretium diam et erat fermentum, ut dignissim lectus rhoncus.
          Maecenas posuere sem eget ex scelerisque, in blandit ligula dictum.
          Praesent efficitur ipsum a lacus vulputate, eget laoreet risus
          dapibus. Vestibulum ac sapien libero. Sed nec ante turpis. Nullam
          vestibulum mattis semper. Fusce et imperdiet tellus. Sed in ornare
          risus. Sed tincidunt eros at justo iaculis euismod.
        </li>
      </ul>
    </div>
  );
};
