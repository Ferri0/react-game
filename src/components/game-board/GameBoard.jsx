import React from 'react';
import PropTypes from 'prop-types';
import StaticCellsSet from '../static-cells-set';
import ActiveCellsSet from '../active-cells-set';
import GameModal from '../game-modal';
import s from './GameBoard.module.scss';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize() {
    this.forceUpdate();
  }

  render() {
    const {
      cellProps,
      cellMap,
      isGameOver,
      isPlayerWon,
      startNewGame,
      handleScore,
      score,
      settings,
    } = this.props;

    return (
      <div className={s.gameBoardWrapper}>
        <GameModal
          score={score}
          isGameOver={isGameOver}
          isPlayerWon={isPlayerWon}
          startNewGame={startNewGame}
          handleScore={handleScore}
        />
        <div className={s.gameBoardInner}>
          <ActiveCellsSet
            cellProps={cellProps}
            cellMap={cellMap}
            gameBoard={settings.board}
          />
          <StaticCellsSet numOfCells={settings.board} />
        </div>
      </div>
    );
  }
}

GameBoard.propTypes = {
  cellProps: PropTypes.arrayOf(
    PropTypes.shape({
      k: PropTypes.number.isRequired,
      v: PropTypes.number.isRequired,
    })
  ).isRequired,
  cellMap: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired,
  isGameOver: PropTypes.bool.isRequired,
  isPlayerWon: PropTypes.bool.isRequired,
  startNewGame: PropTypes.func.isRequired,
  handleScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  settings: PropTypes.shape({
    music: PropTypes.bool.isRequired,
    sounds: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    board: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameBoard;
