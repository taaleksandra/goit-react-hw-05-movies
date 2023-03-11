import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import clsx from 'clsx';
import css from '../Cast/Cast.module.css';

import { fetchCast } from 'components/TMDB-Api/FetchMovies';
import { Loader } from 'components/Loader/Loader';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

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

  useEffect(() => {
    handleCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map(actor => (
          <li className={clsx(css.castItem)} key={actor.name}>
            <img src={actor.photo} alt={actor.name} />
            <div className={clsx(css.actor)}>
              <p>Name: {actor.name}</p>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
      {isLoading && <Loader />}
    </div>
  );
};

export default Cast;
