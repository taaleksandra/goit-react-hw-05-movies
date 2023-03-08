import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { fetchTrending } from './TMDB-Api/FetchMovies';
import { fetchSearch } from './TMDB-Api/FetchMovies';
import { Layout } from './Layout/Layout';
import { Home } from 'pages/Home/Home';
import { Movies } from 'pages/Movies/Movies';
import { MovieDetails } from 'pages/MovieDetails/MovieDetails';
import { Cast } from './Cast/Cast';
import { Reviews } from './Reviews/Reviews';
import { Input } from 'components/Input/Input';

export const App = () => {
  const [trendig, setTrending] = useState([]);
  // const [searchMovies, setSearchMovies] = useState([]);
  // const [searchMoviesId, setSearchMoviesId] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMoviesData, setSearchMoviesData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
      // const moviesTitles = [];
      // const moviesIds = [];
      const moviesData = [];
      movies.map(movie => {
        // moviesTitles.push(movie.original_title);
        // moviesIds.push(movie.id);
        const movieData = {
          title: movie.original_title,
          id: movie.id,
        };
        moviesData.push(movieData);
      });
      // console.log(moviesData);

      setSearchMoviesData(moviesData);
      // setSearchMovies(moviesTitles);
      // setSearchMoviesId(moviesIds);
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

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home trening={trendig} />} />
        <Route
          path="/movies"
          element={
            <Movies data={searchMoviesData} onhandleLoadMore={handleLoadMore}>
              <Input onSubmit={handleSearchMovie} />
            </Movies>
          }
        />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Layout>
  );
};
