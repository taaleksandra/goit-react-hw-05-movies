import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { fetchTrending } from './TMDB-Api/FetchMovies';
import { Layout } from './Layout/Layout';
import { Home } from 'pages/Home/Home';
import { Movies } from 'pages/Movies/Movies';
import { MovieDetails } from 'pages/MovieDetails/MovieDetails';
import { Cast } from './Cast/Cast';
import { Reviews } from './Reviews/Reviews';

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
        <Route path="/movies" element={<Movies titlesArr={titles} />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Layout>
  );
};

// <Layout>
//   <Routes>
//     <Route path="/" element={<Home titlesArr={titles} />} />
//     <Route path="/movies" element={<Movies titlesArr={titles} />} />
//     <Route path="/movies/:movieId" element={<MovieDetails />}>
//       <Route path="cast" element={<Cast />} />
//       <Route path="reviews" element={<Reviews />} />
//     </Route>
//   </Routes>
// </Layout>;
