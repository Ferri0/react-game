import React from 'react';
import PropTypes from 'prop-types';
import GameBoard from '../stateless/GameBoard';
import GameHeader from '../stateless/GameHeader';
import shift from '../util/shift';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellProps: [
        { k: 1, v: 2 },
        { k: 2, v: 2 },
        { k: 3, v: 0 },
        { k: 4, v: 2 },
        { k: 5, v: 2 },
        { k: 6, v: 2 },
        { k: 7, v: 2 },
        { k: 8, v: 0 },
        { k: 9, v: 2 },
        { k: 10, v: 2 },
        { k: 11, v: 0 },
        { k: 12, v: 0 },
        { k: 13, v: 2 },
        { k: 14, v: 2 },
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
    this.horizontalShift = this.horizontalShift.bind(this);
    this.verticalShift = this.verticalShift.bind(this);
  }

  horizontalShift(cellMap, cellProps, destinition) {
    const { map, props } =
      destinition === 'left'
        ? shift.left(cellMap, cellProps)
        : shift.right(cellMap, cellProps);
    this.setState({
      cellMap: map,
      cellProps: props,
    });
  }

  verticalShift(cellMap, cellProps, destinition) {
    const { map, props } =
      destinition === 'top'
        ? shift.top(cellMap, cellProps)
        : shift.bottom(cellMap, cellProps);
    this.setState({
      cellMap: map,
      cellProps: props,
    });
  }

  render() {
    const { cellProps, cellMap } = this.state;
    const { changeAppMode } = this.props;

    return (
      <div className="game">
        <GameHeader score={0} bestScore={1024} changeAppMode={changeAppMode} />
        <GameBoard cellProps={cellProps} cellMap={cellMap} />
        <button
          type="button"
          onClick={() => this.horizontalShift(cellMap, cellProps, 'left')}
        >
          LEFT
        </button>
        <button
          type="button"
          onClick={() => this.horizontalShift(cellMap, cellProps, 'right')}
        >
          RIGHT
        </button>
        <button
          type="button"
          onClick={() => this.verticalShift(cellMap, cellProps, 'top')}
        >
          TOP
        </button>
        <button
          type="button"
          onClick={() => this.verticalShift(cellMap, cellProps, 'bottom')}
        >
          BOTTOM
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  changeAppMode: PropTypes.func.isRequired,
};

export default Game;
