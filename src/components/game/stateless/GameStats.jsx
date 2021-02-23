import React from 'react';
import PropTypes from 'prop-types';

export default function GameStats({ score, bestScore }) {
  return (
    <div className="game__header--stats">
      <div className="game__header--stats--cell">{score}</div>
      <div className="game__header--stats--cell">{bestScore}</div>
    </div>
  );
}

GameStats.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
};
