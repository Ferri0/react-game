import React from 'react';
import PropTypes from 'prop-types';
import GameTitle from '../game-title';
import GameTips from '../game-tips';
import GameStats from '../game-stats';
import GameBtns from '../game-btns';
import s from './GameHeader.module.scss';

export default function GameHeader({
  score,
  bestScore,
  changeAppMode,
  startNewGame,
  shiftScore,
  settings,
  autoplay,
  setAutoplayMode,
}) {
  return (
    <div className={s.gameHeader}>
      <div className={s.leftColumn}>
        <GameTitle winValue={settings.difficulty} />
        <GameTips winValue={settings.difficulty} />
      </div>
      <div className={s.rightColumn}>
        <GameStats
          score={score}
          bestScore={bestScore}
          shiftScore={shiftScore}
        />
        <GameBtns
          changeAppMode={changeAppMode}
          startNewGame={startNewGame}
          autoplay={autoplay}
          setAutoplayMode={setAutoplayMode}
        />
      </div>
    </div>
  );
}

GameHeader.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
  changeAppMode: PropTypes.func.isRequired,
  startNewGame: PropTypes.func.isRequired,
  shiftScore: PropTypes.number.isRequired,
  settings: PropTypes.shape({
    music: PropTypes.bool.isRequired,
    sounds: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    board: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
  }).isRequired,
  autoplay: PropTypes.bool.isRequired,
  setAutoplayMode: PropTypes.func.isRequired,
};
