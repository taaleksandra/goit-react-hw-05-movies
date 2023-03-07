import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { fetchTrending } from './TMDB-Api/FetchMovies';
import { Layout } from './Layout/Layout';
import { Home } from 'pages/Home/Home';
import { Movies } from 'pages/Movies/Movies';
import { MovieDetails } from 'pages/MovieDetails/MovieDetails';

export const App = () => {
  const [titles, setTitles] = useState([]);

  const handleRenderList = async () => {
    const movies = await fetchTrending();
    const moviesTitles = [];
    movies.map(movie => {
      moviesTitles.push(movie.title);
    });
    setTitles(moviesTitles);
  };

  useEffect(() => {
    handleRenderList();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home titlesArr={titles} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
      </Routes>
    </Layout>
  );
};
