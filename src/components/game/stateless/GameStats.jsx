import React from 'react';
import PropTypes from 'prop-types';

export default function GameStats({ score, bestScore, shiftScore }) {
  const shiftScoreStyle = { display: 'block' };
  if (shiftScore === 0) shiftScoreStyle.display = 'none';
  return (
    <div className="game__header--stats">
      <span
        className="game__header--stats--shift-score"
        style={shiftScoreStyle}
        key={score}
      >
        {`+${shiftScore}`}
      </span>
      <div className="game__header--stats--cell">{score}</div>
      <div className="game__header--stats--cell">{bestScore}</div>
    </div>
  );
}

GameStats.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
  shiftScore: PropTypes.number.isRequired,
};
