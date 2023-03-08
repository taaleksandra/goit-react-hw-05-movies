import React from 'react';

import clsx from 'clsx';
import css from '../Input/Input.module.css';

export const Input = ({ onSubmit }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchQuery = form.elements.search.value;
    form.reset();
    onSubmit(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        className={clsx(css.input)}
      />
      <button type="submit" className={clsx(css.btnSearch)}>
        Search
      </button>
    </form>
  );
};
