import React from 'react';
import PropTypes from 'prop-types';

export default function GameBtns({
  changeAppMode,
  startNewGame,
  autoplay,
  setAutoplayMode,
}) {
  if (!autoplay) {
    return (
      <div className="game__header--btns">
        <button
          className="game__header--btns--btn"
          onClick={startNewGame}
          type="button"
        >
          New Game
        </button>
        <button
          className="game__header--btns--btn"
          onClick={() => changeAppMode('inMenu')}
          type="button"
        >
          Menu
        </button>
      </div>
    );
  }
  return (
    <div className="game__header--btns">
      <button
        className="game__header--btns--btn"
        onClick={startNewGame}
        type="button"
      >
        Try Again
      </button>
      <button
        className="game__header--btns--btn"
        onClick={() => setAutoplayMode(false)}
        type="button"
      >
        Stop
      </button>
    </div>
  );
}

GameBtns.propTypes = {
  changeAppMode: PropTypes.func.isRequired,
  startNewGame: PropTypes.func.isRequired,
  autoplay: PropTypes.bool.isRequired,
  setAutoplayMode: PropTypes.func.isRequired,
};
