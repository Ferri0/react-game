import React from 'react';
import PropTypes from 'prop-types';
import GameBoard from '../stateless/GameBoard';
import GameHeader from '../stateless/GameHeader';
import shift from '../util/shift';
import addRandomCell from '../util/addRandomCell';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellProps: [
        { k: 1, v: 2 },
        { k: 2, v: 2 },
        { k: 3, v: 0 },
        { k: 4, v: 0 },
        { k: 5, v: 2 },
        { k: 6, v: 2 },
        { k: 7, v: 0 },
        { k: 8, v: 0 },
        { k: 9, v: 0 },
        { k: 10, v: 0 },
        { k: 11, v: 0 },
        { k: 12, v: 0 },
        { k: 13, v: 0 },
        { k: 14, v: 0 },
        { k: 15, v: 0 },
        { k: 16, v: 0 },
      ],
      cellMap: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ],
    };
    this.globalClickHandler = this.globalClickHandler.bind(this);
    this.horizontalShift = this.horizontalShift.bind(this);
    this.verticalShift = this.verticalShift.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.globalClickHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.globalClickHandler);
  }

  globalClickHandler(e) {
    window.removeEventListener('keydown', this.globalClickHandler);
    const { cellProps, cellMap } = this.state;
    let isCellShifted = false;
    if (e.key === 'ArrowUp') {
      isCellShifted = this.verticalShift(cellMap, cellProps, 'top');
    } else if (e.key === 'ArrowDown')
      isCellShifted = this.verticalShift(cellMap, cellProps, 'bottom');
    else if (e.key === 'ArrowRight')
      isCellShifted = this.horizontalShift(cellMap, cellProps, 'right');
    else if (e.key === 'ArrowLeft')
      isCellShifted = this.horizontalShift(cellMap, cellProps, 'left');
    else {
      window.addEventListener('keydown', this.globalClickHandler);
      return;
    }
    setTimeout(() => {
      const { cellProps: cellPropsUpdated } = this.state;
      if (isCellShifted) {
        this.setState({ cellProps: addRandomCell(cellPropsUpdated) });
      }
      window.addEventListener('keydown', this.globalClickHandler);
    }, 75);
  }

  horizontalShift(cellMap, cellProps, destinition) {
    const { map, props, shifted } =
      destinition === 'left'
        ? shift.left(cellMap, cellProps)
        : shift.right(cellMap, cellProps);
    this.setState({
      cellMap: map,
      cellProps: props,
    });
    return shifted;
  }

  verticalShift(cellMap, cellProps, destinition) {
    const { map, props, shifted } =
      destinition === 'top'
        ? shift.top(cellMap, cellProps)
        : shift.bottom(cellMap, cellProps);
    this.setState({
      cellMap: map,
      cellProps: props,
    });
    return shifted;
  }

  render() {
    const { cellProps, cellMap } = this.state;
    const { changeAppMode } = this.props;

    return (
      <div className="game">
        <GameHeader score={0} bestScore={1024} changeAppMode={changeAppMode} />
        <GameBoard cellProps={cellProps} cellMap={cellMap} />
      </div>
    );
  }
}

Game.propTypes = {
  changeAppMode: PropTypes.func.isRequired,
};

export default Game;
