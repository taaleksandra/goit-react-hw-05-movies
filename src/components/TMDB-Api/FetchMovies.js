import axios from 'axios';

const apiKey = '9d7a39f8c7043e83eaf145d46d730826';

export const fetchTrending = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
  );

  return response.data.results;
};

export const fetchSearch = async (searchQuery, pageNumber) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=${pageNumber}&include_adult=false`
  );

  return response.data.results;
};

export const fetchDetails = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
  );

  return response.data;
};

export const fetchCast = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
  );

  return response.data.cast;
};

export const fetchReviews = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US`
  );

  return response.data.results;
};
