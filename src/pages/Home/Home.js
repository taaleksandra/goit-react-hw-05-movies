import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import css from '../Home/Home.module.css';

export const Home = ({ titlesArr }) => {
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
