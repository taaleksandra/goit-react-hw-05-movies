import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import clsx from 'clsx';
import css from '../Home/Home.module.css';

import { fetchTrending } from '../../components/TMDB-Api/FetchMovies';

const Home = ({ onClinkMovie }) => {
  const location = useLocation();

  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // renderowanie popularnych filmów na home page
  const handleRenderList = async () => {
    setIsLoading(true);

    try {
      const movies = await fetchTrending();
      const moviesData = [];
      movies.map(movie => {
        const movieData = {
          title: movie.original_title,
          id: movie.id,
        };
        moviesData.push(movieData);
      });
      setTrending(moviesData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRenderList();
  }, []);

  return (
    <>
      <h1>Trending movies</h1>
      <ul>
        {trending.map(movie => (
          <li key={movie.id}>
            <Link
              id={movie.id}
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={clsx(css.movieLink)}
              onClick={onClinkMovie}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
