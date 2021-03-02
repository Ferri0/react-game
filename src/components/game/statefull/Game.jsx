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
    const { settings } = this.props;
    const { cellProps, cellMap } = getGameState(settings.board);
    this.state = {
      cellProps,
      cellMap,
      gameScore: 0,
      shiftScore: 0,
      isGameOver: false,
      isPlayerWon: false,
    };
    this.globalClickHandler = this.globalClickHandler.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  componentDidMount() {
    const storedGameState = JSON.parse(localStorage.getItem('gameState'));
    if (storedGameState) {
      this.setState(storedGameState);
    }
    window.addEventListener('keydown', this.globalClickHandler);
    setTimeout(() => {
      const { isGameOver, isPlayerWon } = this.state;
      if (isGameOver || isPlayerWon) {
        window.removeEventListener('keydown', this.globalClickHandler);
      }
    }, 100);
  }

  componentDidUpdate() {
    const { sounds, settings } = this.props;
    const { isGameOver, isPlayerWon } = this.state;
    if (!isGameOver) {
      if (checkWinCondition(settings.difficulty, this.state) && !isPlayerWon) {
        if (settings.sounds) sounds.winGame.play();
        this.playerWin();
        window.removeEventListener('keydown', this.globalClickHandler);
      } else if (checkLoseCondition(this.state)) {
        if (settings.sounds) sounds.loseGame.play();
        this.gameOver();
        window.removeEventListener('keydown', this.globalClickHandler);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.globalClickHandler);
    this.saveGameState();
  }

  gameOver() {
    this.setState({ isGameOver: true });
  }

  playerWin() {
    this.setState({ isPlayerWon: true });
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
      const { isGameOver, isPlayerWon } = this.state;
      if (!isGameOver && !isPlayerWon) {
        window.addEventListener('keydown', this.globalClickHandler);
      }
    }, 75);
  }

  startNewGame() {
    const { loadSavedScore, sounds, settings } = this.props;
    sounds.newGame.currentTime = 0;
    if (settings.sounds) sounds.newGame.play();
    loadSavedScore();
    this.setState(getGameState(settings.board));
    window.addEventListener('keydown', this.globalClickHandler);
  }

  saveGameState() {
    localStorage.setItem('gameState', JSON.stringify(this.state));
  }

  horizontalShift(cellMap, cellProps, destinition) {
    const { sounds, settings } = this.props;
    const { map, props, shifted, shiftScore } =
      destinition === 'left'
        ? shift.left(cellMap, cellProps)
        : shift.right(cellMap, cellProps);
    const { gameScore } = this.state;
    if (shifted && settings.sounds) {
      sounds.shiftSound.play();
    }
    this.setState({
      cellMap: map,
      cellProps: props,
      gameScore: gameScore + shiftScore,
      shiftScore,
    });
    return shifted;
  }

  verticalShift(cellMap, cellProps, destinition) {
    const { sounds, settings } = this.props;
    const { map, props, shifted, shiftScore } =
      destinition === 'top'
        ? shift.top(cellMap, cellProps)
        : shift.bottom(cellMap, cellProps);
    const { gameScore } = this.state;
    if (shifted && settings.sounds) {
      sounds.shiftSound.play();
    }
    this.setState({
      cellMap: map,
      cellProps: props,
      gameScore: gameScore + shiftScore,
      shiftScore,
    });
    return shifted;
  }

  render() {
    const {
      cellProps,
      cellMap,
      gameScore,
      shiftScore,
      isGameOver,
      isPlayerWon,
    } = this.state;
    const { changeAppMode, topScore, handleScore, settings } = this.props;
    let actualTopScore = 0;
    if (gameScore > topScore) {
      actualTopScore = gameScore;
    } else {
      actualTopScore = topScore;
    }

    return (
      <div className="game">
        <GameHeader
          settings={settings}
          score={gameScore}
          shiftScore={shiftScore}
          bestScore={actualTopScore}
          changeAppMode={changeAppMode}
          startNewGame={this.startNewGame}
        />
        <GameBoard
          settings={settings}
          score={gameScore}
          cellProps={cellProps}
          cellMap={cellMap}
          isGameOver={isGameOver}
          isPlayerWon={isPlayerWon}
          startNewGame={this.startNewGame}
          handleScore={handleScore}
        />
      </div>
    );
  }
}

Game.propTypes = {
  changeAppMode: PropTypes.func.isRequired,
  topScore: PropTypes.number.isRequired,
  handleScore: PropTypes.func.isRequired,
  loadSavedScore: PropTypes.func.isRequired,
  sounds: PropTypes.shape({
    shiftSound: PropTypes.instanceOf(Audio).isRequired,
    menuSound: PropTypes.instanceOf(Audio).isRequired,
    loseGame: PropTypes.instanceOf(Audio).isRequired,
    winGame: PropTypes.instanceOf(Audio).isRequired,
    newGame: PropTypes.instanceOf(Audio).isRequired,
    settingsSound: PropTypes.instanceOf(Audio).isRequired,
    setVolume: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired,
  }).isRequired,
  settings: PropTypes.shape({
    music: PropTypes.bool.isRequired,
    sounds: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    board: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
  }).isRequired,
};
export default Game;
