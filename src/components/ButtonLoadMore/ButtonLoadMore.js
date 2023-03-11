import React from 'react';
import { PropTypes } from 'prop-types';

import clsx from 'clsx';
import css from '../ButtonLoadMore/ButtonLoadMore.module.css';

export const ButtonLoadMore = ({ onClick }) => (
  <button onClick={onClick} className={clsx(css.btnLoad)}>
    Load more
  </button>
);

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func,
};
