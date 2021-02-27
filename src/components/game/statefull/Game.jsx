import React from 'react';
import PropTypes from 'prop-types';
import GameBoard from '../stateless/GameBoard';
import GameHeader from '../stateless/GameHeader';
import shift from '../util/shift';
import addRandomCell from '../util/addRandomCell';
import getGameState from '../util/getGameState';
import checkWinCondition from '../util/checkWinCondition';
import checkLoseCondition from '../util/checkLoseCondition';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const { cellProps, cellMap } = getGameState();
    this.state = { cellProps, cellMap, gameScore: 0, shiftScore: 0 };
    this.globalClickHandler = this.globalClickHandler.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.globalClickHandler);
    const storedGameState = JSON.parse(localStorage.getItem('gameState'));
    if (storedGameState) {
      this.setState(storedGameState);
    }
  }

  componentDidUpdate() {
    if (checkWinCondition(128, this.state)) {
      console.log('WON');
    } else if (checkLoseCondition(this.state)) {
      console.log('LOST');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.globalClickHandler);
    this.saveGameState();
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
      this.saveGameState();
      window.addEventListener('keydown', this.globalClickHandler);
    }, 75);
  }

  async startNewGame() {
    this.setState(getGameState());
  }

  saveGameState() {
    localStorage.setItem('gameState', JSON.stringify(this.state));
  }

  horizontalShift(cellMap, cellProps, destinition) {
    const { map, props, shifted, shiftScore } =
      destinition === 'left'
        ? shift.left(cellMap, cellProps)
        : shift.right(cellMap, cellProps);
    const { gameScore } = this.state;
    this.setState({
      cellMap: map,
      cellProps: props,
      gameScore: gameScore + shiftScore,
      shiftScore,
    });
    return shifted;
  }

  verticalShift(cellMap, cellProps, destinition) {
    const { map, props, shifted, shiftScore } =
      destinition === 'top'
        ? shift.top(cellMap, cellProps)
        : shift.bottom(cellMap, cellProps);
    const { gameScore } = this.state;
    this.setState({
      cellMap: map,
      cellProps: props,
      gameScore: gameScore + shiftScore,
      shiftScore,
    });
    return shifted;
  }

  render() {
    const { cellProps, cellMap, gameScore, shiftScore } = this.state;
    const { changeAppMode } = this.props;

    return (
      <div className="game">
        <GameHeader
          score={gameScore}
          shiftScore={shiftScore}
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
