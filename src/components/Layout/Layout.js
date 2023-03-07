import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { PropTypes } from 'prop-types';

import css from '../Layout/Layout.module.css';
import { Link } from './Active.styled';

export const Layout = ({ children }) => {
  return (
    <>
      <header className={clsx(css.wraper)}>
        <nav className={clsx(css.mainNav)}>
          <Link to="/" end className={clsx(css.link)}>
            Home
          </Link>
          <Link to="/movies" className={clsx(css.link)}>
            Movies
          </Link>
        </nav>
      </header>
      {children}
    </>
  );
};
