import React from 'react';
import PropTypes from 'prop-types';
import GameBoard from '../stateless/GameBoard';
import GameHeader from '../stateless/GameHeader';
import shift from '../util/shift';
import addRandomCell from '../util/addRandomCell';
import getGameState from '../util/getGameState';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = getGameState();
    this.globalClickHandler = this.globalClickHandler.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
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

  startNewGame() {
    this.setState(getGameState());
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
        <GameHeader
          score={0}
          bestScore={1024}
          changeAppMode={changeAppMode}
          startNewGame={this.startNewGame}
        />
        <GameBoard cellProps={cellProps} cellMap={cellMap} />
      </div>
    );
  }
}

Game.propTypes = {
  changeAppMode: PropTypes.func.isRequired,
};

export default Game;
