import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import css from '../MovieDetails/MovieDetails.module.css';
import { ButtonBack } from 'components/ButtonBack/ButtonBack';

export const MovieDetails = ({ movieDetails, onClinkCast, onClinkReviews }) => {
  const location = useLocation();
  const { id, title, poster, score, overview, genres } = movieDetails;
  const hrefToPoster = `https://image.tmdb.org/t/p/w300/${poster}`;

  https: return (
    <>
      <ButtonBack />
      <div className={clsx(css.movieBox)}>
        <img src={hrefToPoster} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>User score: {score}</p>
          <div className={clsx(css.descBox)}>
            <h4>OVERVIEW</h4>
            <p>{overview}</p>
          </div>
          <div className={clsx(css.descBox)}>
            <h4>GENRES</h4>
            <p>{genres}</p>
          </div>
        </div>
      </div>
      <div className={clsx(css.linksBox)}>
        <Link
          to="cast"
          state={{ movieList: location.state.from || location.state.movieList }}
          className={clsx(css.linkMore)}
          onClick={onClinkCast}
        >
          Cast
        </Link>
        <Link
          to="reviews"
          state={{ movieList: location.state.from || location.state.movieList }}
          className={clsx(css.linkMore)}
          onClick={onClinkReviews}
        >
          Reviews
        </Link>
      </div>
      <Outlet />
    </>
  );
};
