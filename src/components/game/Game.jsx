import React from 'react';
import PropTypes from 'prop-types';
import GameBoard from '../game-board/GameBoard';
import GameHeader from '../game-header';
import shift from '../util/shift';
import addRandomCell from '../util/addRandomCell';
import getGameState from '../util/getGameState';
import checkWinCondition from '../util/checkWinCondition';
import checkLoseCondition from '../util/checkLoseCondition';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.xDown = null;
    this.yDown = null;
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
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  componentDidMount() {
    const { autoplay } = this.props;
    const storedGameState = JSON.parse(localStorage.getItem('gameState'));
    if (storedGameState) {
      this.setState(storedGameState);
    }
    if (!autoplay && !window.mobileAndTabletCheck()) {
      window.addEventListener('keydown', this.globalClickHandler);
    } else if (!autoplay && window.mobileAndTabletCheck()) {
      window.addEventListener('touchstart', this.handleTouchStart, false);
      window.addEventListener('touchmove', this.handleTouchMove, false);
    } else {
      const { settings } = this.props;
      window.removeEventListener('keydown', this.globalClickHandler);
      this.setState(getGameState(settings.board));
      this.interval = setInterval(() => {
        const { cellMap, cellProps } = this.state;
        let isCellShifted = false;
        if (!isCellShifted) {
          isCellShifted = this.verticalShift(cellMap, cellProps, 'top');
        }
        if (!isCellShifted) {
          isCellShifted = this.verticalShift(cellMap, cellProps, 'bottom');
        }
        if (!isCellShifted) {
          isCellShifted = this.horizontalShift(cellMap, cellProps, 'right');
        }
        if (!isCellShifted) {
          isCellShifted = this.horizontalShift(cellMap, cellProps, 'left');
        }

        setTimeout(() => {
          if (isCellShifted) {
            const { cellProps: cellPropsUpdated } = this.state;
            this.setState({ cellProps: addRandomCell(cellPropsUpdated) });
          }
        }, 100);
      }, 500);
    }
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
    clearInterval(this.interval);
    window.removeEventListener('keydown', this.globalClickHandler);
    this.saveGameState();
  }

  handleTouchStart(e) {
    const firstTouch = e.touches[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  handleTouchMove(e) {
    if (!this.xDown || !this.yDown) {
      return;
    }
    window.removeEventListener('touchstart', this.handleTouchStart, false);
    window.removeEventListener('touchmove', this.handleTouchMove, false);

    const { cellProps, cellMap } = this.state;
    let isCellShifted = false;

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        isCellShifted = this.horizontalShift(cellMap, cellProps, 'left');
      } else {
        isCellShifted = this.horizontalShift(cellMap, cellProps, 'right');
      }
    } else if (yDiff > 0) {
      isCellShifted = this.verticalShift(cellMap, cellProps, 'top');
    } else {
      isCellShifted = this.verticalShift(cellMap, cellProps, 'bottom');
    }

    setTimeout(() => {
      const { cellProps: cellPropsUpdated } = this.state;
      if (isCellShifted) {
        this.setState({ cellProps: addRandomCell(cellPropsUpdated) });
      }
      this.saveGameState();
      const { isGameOver, isPlayerWon } = this.state;
      if (!isGameOver && !isPlayerWon) {
        window.addEventListener('touchstart', this.handleTouchStart, false);
        window.addEventListener('touchmove', this.handleTouchMove, false);
      }
    }, 75);
    this.xDown = null;
    this.yDown = null;
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
    const {
      changeAppMode,
      topScore,
      handleScore,
      settings,
      autoplay,
      setAutoplayMode,
    } = this.props;
    let actualTopScore = 0;
    if (gameScore > topScore) {
      actualTopScore = gameScore;
    } else {
      actualTopScore = topScore;
    }

    return (
      <div>
        <GameHeader
          setAutoplayMode={setAutoplayMode}
          autoplay={autoplay}
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
  autoplay: PropTypes.bool.isRequired,
  setAutoplayMode: PropTypes.func.isRequired,
};
export default Game;
