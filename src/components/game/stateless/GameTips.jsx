import React from 'react';
import PropTypes from 'prop-types';

export default function GameTips({ winValue }) {
  return (
    <div className="game__header--tips">
      Join the tiles,
      <br />
      {`get to ${winValue}!`}
    </div>
  );
}

GameTips.propTypes = {
  winValue: PropTypes.number.isRequired,
};
