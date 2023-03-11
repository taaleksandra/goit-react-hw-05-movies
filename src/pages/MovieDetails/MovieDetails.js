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

  const { id, title, poster, score, overview, genres } = details;
  const hrefToPoster = `https://image.tmdb.org/t/p/w300/${poster}`;

  // obsługa zapytania o szczegóły filmu
  const handleMovieDetails = async () => {
    setIsLoading(true);

    try {
      const clickedMovieDetails = await fetchDetails(movieId);

      const genresArr = [];
      clickedMovieDetails.genres.map(genre => {
        genresArr.push(genre.name);
      });

      setDetails({
        id: clickedMovieDetails.id,
        title: clickedMovieDetails.original_title,
        poster: clickedMovieDetails.poster_path,
        score: clickedMovieDetails.vote_average,
        overview: clickedMovieDetails.overview,
        genres: genresArr.join(', '),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleMovieDetails();
  }, [movieId]);

  return (
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
