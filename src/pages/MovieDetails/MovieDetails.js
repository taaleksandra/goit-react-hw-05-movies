import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import css from '../MovieDetails/MovieDetails.module.css';
import { ButtonBack } from 'components/ButtonBack/ButtonBack';

export const MovieDetails = () => {
  const location = useLocation();

  return (
    <>
      <ButtonBack />
      <p>Hello! That's the page with details about the movie</p>
      <div className={clsx(css.linksBox)}>
        <Link
          to="cast"
          state={{ movieList: location.state.from || location.state.movieList }}
          className={clsx(css.linkMore)}
        >
          Cast
        </Link>
        <Link
          to="reviews"
          state={{ movieList: location.state.from || location.state.movieList }}
          className={clsx(css.linkMore)}
        >
          Reviews
        </Link>
      </div>
      <Outlet />
    </>
  );
};
