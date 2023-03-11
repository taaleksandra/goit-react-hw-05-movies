import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import clsx from 'clsx';
import css from '../Movies/Movies.module.css';

import { fetchSearch } from '../../components/TMDB-Api/FetchMovies';
import { Input } from 'components/Input/Input';
import { ButtonLoadMore } from '../../components/ButtonLoadMore/ButtonLoadMore';
import { Loader } from 'components/Loader/Loader';

const Movies = () => {
  const location = useLocation();

  // const [searchQuery, setSearchQuery] = useState('');
  const [searchMoviesData, setSearchMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  // obsługa wyszukiwania filmów na stronie movies
  const handleSearchMovie = async () => {
    setIsLoading(true);
    setPageNumber(1);
    // setSearchQuery(searchQuery);

    try {
      const movies = await fetchSearch(searchQuery, 1);
      // console.log(movies);
      const moviesData = [];
      movies.map(movie => {
        const movieData = {
          title: movie.original_title,
          id: movie.id,
        };
        moviesData.push(movieData);
      });

      setSearchMoviesData(moviesData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setPageNumber(pageNumber + 1);
    }
  };

  const handleSubmit = searchQuery => {
    setSearchParams({ query: searchQuery });
  };

  useEffect(() => {
    if (searchQuery === null) {
      return;
    }
    handleSearchMovie();
  }, [searchQuery]);

  // obsługa load more na movies page
  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const nextMovies = await fetchSearch(searchQuery, pageNumber);
      const nextMoviesData = [];
      nextMovies.map(movie => {
        const movieData = {
          title: movie.original_title,
          id: movie.id,
        };
        nextMoviesData.push(movieData);
      });
      setSearchMoviesData(searchMoviesData.concat(nextMoviesData));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <>
      <Input onSubmit={handleSubmit} />
      <ul>
        {searchMoviesData.length !== 0 &&
          searchMoviesData.map(movie => (
            <li key={movie.id}>
              <Link
                id={movie.id}
                to={`/movies/${movie.id}`}
                state={{ from: location }}
                className={clsx(css.movieLink)}
              >
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
      {isLoading && <Loader />}
      {searchMoviesData.length > 0 && (
        <ButtonLoadMore onClick={handleLoadMore} />
      )}
    </>
  );
};

export default Movies;
