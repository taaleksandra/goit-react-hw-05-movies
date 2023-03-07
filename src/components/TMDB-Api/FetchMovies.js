import axios from 'axios';

const apiKey = '9d7a39f8c7043e83eaf145d46d730826';

export const fetchTrending = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
  );

  return response.data.results;
};
