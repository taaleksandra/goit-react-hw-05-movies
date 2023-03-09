import React from 'react';
import clsx from 'clsx';
import css from '../Cast/Cast.module.css';

export const Cast = ({ cast }) => {
  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map(actor => (
          <li className={clsx(css.castItem)}>
            <img src={actor.photo} alt={cast.name} />
            <div className={clsx(css.actor)}>
              <p>Name: {actor.name}</p>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
