import React from 'react';
import PropTypes from 'prop-types';
import s from './GameStats.module.scss';

export default function GameStats({ score, bestScore, shiftScore }) {
  const shiftScoreStyle = { display: 'block' };
  if (shiftScore === 0) shiftScoreStyle.display = 'none';
  return (
    <div className={s.statsBlock}>
      <span className={s.shiftScore} style={shiftScoreStyle} key={score}>
        {`+${shiftScore}`}
      </span>
      <div className={s.statsCell}>{score}</div>
      <div className={s.statsCell}>{bestScore}</div>
    </div>
  );
}

GameStats.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
  shiftScore: PropTypes.number.isRequired,
};
