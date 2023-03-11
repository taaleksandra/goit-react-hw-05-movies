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
  const handleSubmit = searchQuery => {
    setSearchParams({ query: searchQuery });
  };

  useEffect(() => {
    if (searchQuery === null) {
      return;
    }

    const handleSearchMovie = async () => {
      setIsLoading(true);
      setPageNumber(1);

      try {
        const movies = await fetchSearch(searchQuery, 1);
        setSearchMoviesData(movies);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setPageNumber(p => p + 1);
      }
    };

    handleSearchMovie();
  }, [searchQuery]);

  // obsługa load more na movies page
  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const nextMovies = await fetchSearch(searchQuery, pageNumber);
      setSearchMoviesData(searchMoviesData.concat(nextMovies));
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
        {searchMoviesData.map(movie => (
          <li key={movie.id}>
            <Link
              id={movie.id}
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={clsx(css.movieLink)}
            >
              {movie.original_title}
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
