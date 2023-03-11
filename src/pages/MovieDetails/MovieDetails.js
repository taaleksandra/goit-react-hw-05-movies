import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import clsx from 'clsx';
import css from '../MovieDetails/MovieDetails.module.css';

import { fetchDetails } from 'components/TMDB-Api/FetchMovies';
import { ButtonBack } from 'components/ButtonBack/ButtonBack';
import { Loader } from 'components/Loader/Loader';

const MovieDetails = () => {
  const location = useLocation();

  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  const { title, poster_path, vote_average, overview, genres } = details;
  const hrefToPoster = `https://image.tmdb.org/t/p/w300/${poster_path}`;

  // obsługa zapytania o szczegóły filmu

  useEffect(() => {
    const handleMovieDetails = async () => {
      setIsLoading(true);

      try {
        const clickedMovieDetails = await fetchDetails(movieId);
        setDetails(clickedMovieDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleMovieDetails();
  }, [movieId]);

  return (
    <>
      <ButtonBack />
      <div className={clsx(css.movieBox)}>
        <img src={hrefToPoster} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>User score: {vote_average}</p>
          <div className={clsx(css.descBox)}>
            <h4>OVERVIEW</h4>
            <p>{overview}</p>
          </div>
          <div className={clsx(css.descBox)}>
            <h4>GENRES</h4>
            <ul>
              {!genres ? (
                <></>
              ) : (
                genres.map(genre => <li key={genre.id}>{genre.name}</li>)
              )}
            </ul>
          </div>
        </div>
      </div>
      <div>DETAILS</div>
      {isLoading && <Loader />}

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

export default MovieDetails;
