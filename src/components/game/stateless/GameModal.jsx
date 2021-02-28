import React from 'react';
import PropTypes from 'prop-types';

export default function GameModal({
  isGameOver,
  isPlayerWon,
  startNewGame,
  handleScore,
  score,
}) {
  const handleClick = function handler(newScore) {
    handleScore(newScore);
    startNewGame();
  };
  if (isGameOver) {
    return (
      <div className="game__modal">
        <div className="game__modal--title">GAME OVER</div>
        <button
          className="game__modal--btn"
          type="button"
          onClick={() => handleClick(score)}
        >
          Try Again
        </button>
      </div>
    );
  }
  if (isPlayerWon) {
    return (
      <div className="game__modal">
        <div className="game__modal--title">YOU WON!</div>
        <button
          className="game__modal--btn"
          type="button"
          onClick={startNewGame}
        >
          Play Again
        </button>
      </div>
    );
  }
  return null;
}

GameModal.propTypes = {
  isGameOver: PropTypes.bool.isRequired,
  isPlayerWon: PropTypes.bool.isRequired,
  startNewGame: PropTypes.func.isRequired,
  handleScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};
