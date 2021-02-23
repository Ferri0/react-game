import React from 'react';
import PropTypes from 'prop-types';
import StaticCellsSet from './BgCellsSet';
import ActiveCellsSet from './ActiveCellsSet';

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
    const { gameState } = this.props;

    return (
      <div className="game__board--wrapper">
        <div className="game__board--inner">
          <ActiveCellsSet gameState={gameState} />
          <StaticCellsSet numOfCells={16} />
        </div>
      </div>
    );
  }
}

GameBoard.propTypes = {
  gameState: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default GameBoard;
