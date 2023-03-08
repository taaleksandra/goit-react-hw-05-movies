import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import css from '../Movies/Movies.module.css';

export const Movies = ({ titlesArr }) => {
  return (
    <ul>
      {titlesArr.map(title => (
        <li key={title}>
          <Link to="/movies/:movieId" className={clsx(css.movieLink)}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
