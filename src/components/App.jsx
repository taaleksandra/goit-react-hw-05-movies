import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { fetchTrending } from './TMDB-Api/FetchMovies';
import { fetchSearch } from './TMDB-Api/FetchMovies';
import { fetchDetails } from './TMDB-Api/FetchMovies';
import { fetchCast } from './TMDB-Api/FetchMovies';
import { fetchReviews } from './TMDB-Api/FetchMovies';
import { Layout } from './Layout/Layout';
import { Home } from 'pages/Home/Home';
import { Movies } from 'pages/Movies/Movies';
import { MovieDetails } from 'pages/MovieDetails/MovieDetails';
import { Cast } from './Cast/Cast';
import { Reviews } from './Reviews/Reviews';
import { Input } from 'components/Input/Input';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trendig, setTrending] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [movieId, setMovieId] = useState();
  const [searchMoviesData, setSearchMoviesData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  // renderowanie popularnych filmów na home page
  const handleRenderList = async () => {
    setIsLoading(true);

    try {
      const movies = await fetchTrending();
      const moviesData = [];
      movies.map(movie => {
        const movieData = {
          title: movie.original_title,
          id: movie.id,
        };
        moviesData.push(movieData);
      });
      setTrending(moviesData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRenderList();
  }, []);

  // obsługa wyszukiwania filmów na stronie movies
  const handleSearchMovie = async searchQuery => {
    setIsLoading(true);
    setPageNumber(1);
    setSearchQuery(searchQuery);

    try {
      const movies = await fetchSearch(searchQuery, 1);
      console.log(movies);
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

  // obsługa zapytania o szczegóły filmu
  const handleMovieDetails = async evt => {
    setIsLoading(true);
    const clickedMovieId = evt.currentTarget.id;
    setMovieId(clickedMovieId);

    try {
      const clickedMovieDetails = await fetchDetails(clickedMovieId);

      const genresArr = [];
      clickedMovieDetails.genres.map(genre => {
        genresArr.push(genre.name);
      });

      setMovieDetails({
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

  // obsługa zapytania o obsadę filmu
  const handleCast = async () => {
    setIsLoading(true);
    setCast([]);

    try {
      const movieCast = await fetchCast(Number(movieId));
      const castData = [];
      movieCast.map(actor => {
        const actorData = {
          id: actor.id,
          name: actor.name,
          character: actor.character,
          photo: 'https://image.tmdb.org/t/p/w200/' + actor.profile_path,
        };
        castData.push(actorData);
      });

      setCast(castData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // obsługa zapytania o reviews filmu
  const handleReviews = async () => {
    setIsLoading(true);
    setReviews([]);

    try {
      const reviewsData = await fetchReviews(movieId);
      console.log(reviewsData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Home trening={trendig} onClinkMovie={handleMovieDetails} />}
        />
        <Route
          path="/movies"
          element={
            <Movies
              data={searchMoviesData}
              onhandleLoadMore={handleLoadMore}
              onClinkMovie={handleMovieDetails}
            >
              <Input onSubmit={handleSearchMovie} />
            </Movies>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <MovieDetails
              movieDetails={movieDetails}
              onClinkCast={handleCast}
              onClinkReviews={handleReviews}
            />
          }
        >
          <Route path="cast" element={<Cast cast={cast} />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Layout>
  );
};
