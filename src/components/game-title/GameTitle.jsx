import React from 'react';
import PropTypes from 'prop-types';
import s from './GameTitle.module.scss';

export default function GameTitle({ winValue }) {
  return (
    <div className={[s.headerTitle, s[`winValue${winValue}`]].join(' ')}>
      {winValue}
    </div>
  );
}

GameTitle.propTypes = {
  winValue: PropTypes.number.isRequired,
};
