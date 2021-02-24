import React from 'react';
import PropTypes from 'prop-types';
import GameBoard from '../stateless/GameBoard';
import GameHeader from '../stateless/GameHeader';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellProps: [
        { k: 1, v: 0 },
        { k: 2, v: 0 },
        { k: 3, v: 2 },
        { k: 4, v: 0 },
        { k: 5, v: 0 },
        { k: 6, v: 0 },
        { k: 7, v: 0 },
        { k: 8, v: 0 },
        { k: 9, v: 0 },
        { k: 10, v: 2 },
        { k: 11, v: 0 },
        { k: 12, v: 0 },
        { k: 13, v: 0 },
        { k: 14, v: 0 },
        { k: 15, v: 2 },
        { k: 16, v: 0 },
      ],
      cellMap: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ],
    };
    this.testFunc = this.testFunc.bind(this);
  }

  testFunc() {
    this.setState({
      cellMap: [
        [1, 2, 11, 4],
        [5, 6, 7, 8],
        [9, 10, 3, 12],
        [13, 14, 15, 16],
      ],
    });
  }

  render() {
    const { cellProps, cellMap } = this.state;
    const { changeAppMode } = this.props;

    return (
      <div className="game">
        <GameHeader score={0} bestScore={1024} changeAppMode={changeAppMode} />
        <GameBoard cellProps={cellProps} cellMap={cellMap} />
        <button type="button" onClick={this.testFunc}>
          TEST
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  changeAppMode: PropTypes.func.isRequired,
};

export default Game;
