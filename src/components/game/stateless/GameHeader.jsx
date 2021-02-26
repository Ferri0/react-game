import React from 'react';
import PropTypes from 'prop-types';
import GameTitle from './GameTitle';
import GameTips from './GameTips';
import GameStats from './GameStats';
import GameBtns from './GameBtns';

export default function GameHeader({
  score,
  bestScore,
  changeAppMode,
  startNewGame,
}) {
  return (
    <div className="game__header">
      <div className="game__header--left-column">
        <GameTitle />
        <GameTips />
      </div>
      <div className="game__header--right-column">
        <GameStats score={score} bestScore={bestScore} />
        <GameBtns changeAppMode={changeAppMode} startNewGame={startNewGame} />
      </div>
    </div>
  );
}

GameHeader.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
  changeAppMode: PropTypes.func.isRequired,
  startNewGame: PropTypes.func.isRequired,
};
