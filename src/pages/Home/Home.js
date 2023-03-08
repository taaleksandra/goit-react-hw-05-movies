import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import css from '../Home/Home.module.css';

export const Home = ({ trening, onClinkMovie }) => {
  const location = useLocation();

  return (
    <>
      <h1>Trending movies</h1>
      <ul>
        {trening.map(movie => (
          <li key={movie.id}>
            <Link
              id={movie.id}
              to="/movies/:movieId"
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
