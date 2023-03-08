import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import css from '../Movies/Movies.module.css';
import { ButtonLoadMore } from '../../components/ButtonLoadMore/ButtonLoadMore';

export const Movies = ({ data, children, onhandleLoadMore, onClinkMovie }) => {
  const location = useLocation();

  return (
    <>
      {children}
      <ul>
        {data.map(movie => (
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
      {data.length > 0 && <ButtonLoadMore onClick={onhandleLoadMore} />}
    </>
  );
};
