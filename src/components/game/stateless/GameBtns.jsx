import React from 'react';
import PropTypes from 'prop-types';

export default function GameStats({ changeAppMode }) {
  return (
    <div className="game__header--btns">
      <div className="game__header--btns--btn">New Game</div>
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

GameStats.propTypes = {
  changeAppMode: PropTypes.func.isRequired,
};
