import React from 'react';
import PropTypes from 'prop-types';
import s from './GameTips.module.scss';

export default function GameTips({ winValue }) {
  return (
    <div className={s.gameTips}>
      Join the tiles,
      <br />
      {`get to ${winValue}!`}
    </div>
  );
}

GameTips.propTypes = {
  winValue: PropTypes.number.isRequired,
};
