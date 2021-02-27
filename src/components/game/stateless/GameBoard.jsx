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
    } = this.props;

    return (
      <div className="game__board--wrapper">
        <GameModal
          isGameOver={isGameOver}
          isPlayerWon={isPlayerWon}
          startNewGame={startNewGame}
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
};

export default GameBoard;
