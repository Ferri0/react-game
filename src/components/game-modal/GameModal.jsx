import React from 'react';
import PropTypes from 'prop-types';
import s from './GameModal.module.scss';

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
      <div className={s.modal}>
        <div className={s.modalTitle}>GAME OVER</div>
        <button
          className={s.modalBtn}
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
      <div className={s.modal}>
        <div className={s.modalTitle}>YOU WON!</div>
        <button className={s.modalBtn} type="button" onClick={startNewGame}>
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
