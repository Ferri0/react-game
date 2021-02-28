import React from 'react';
import PropTypes from 'prop-types';
import StaticCellsSet from './BgCellsSet';
import ActiveCellsSet from './ActiveCellsSet';
import GameModal from './GameModal';

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
    } = this.props;

    return (
      <div className="game__board--wrapper">
        <GameModal
          score={score}
          isGameOver={isGameOver}
          isPlayerWon={isPlayerWon}
          startNewGame={startNewGame}
          handleScore={handleScore}
        />
        <div className="game__board--inner">
          <ActiveCellsSet cellProps={cellProps} cellMap={cellMap} />
          <StaticCellsSet numOfCells={16} />
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
};

export default GameBoard;
