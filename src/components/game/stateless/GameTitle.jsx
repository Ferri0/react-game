import React from 'react';
import PropTypes from 'prop-types';

export default function GameTitle({ winValue }) {
  return (
    <div className={`game__header--title game__header--${winValue}`}>
      {winValue}
    </div>
  );
}

GameTitle.propTypes = {
  winValue: PropTypes.number.isRequired,
};
