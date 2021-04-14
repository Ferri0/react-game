import React from 'react';
import PropTypes from 'prop-types';
import s from './GameBtns.module.scss';

export default function GameBtns({
  changeAppMode,
  startNewGame,
  autoplay,
  setAutoplayMode,
}) {
  if (!autoplay) {
    return (
      <div className={s.headerBtnsBlock}>
        <button className={s.headerBtn} onClick={startNewGame} type="button">
          New Game
        </button>
        <button
          className={s.headerBtn}
          onClick={() => changeAppMode('inMenu')}
          type="button"
        >
          Menu
        </button>
      </div>
    );
  }
  return (
    <div className={s.headerBtnsBlock}>
      <button className={s.headerBtn} onClick={startNewGame} type="button">
        Try Again
      </button>
      <button
        className={s.headerBtn}
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
