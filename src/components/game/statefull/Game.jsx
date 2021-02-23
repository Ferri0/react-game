import React from 'react';
import PropTypes from 'prop-types';
import GameBoard from '../stateless/GameBoard';
import GameHeader from '../stateless/GameHeader';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 2, 0, 0],
        [0, 0, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 0],
      ],
    };
  }

  render() {
    const { gameState } = this.state;
    const { changeAppMode } = this.props;

    return (
      <div className="game">
        <GameHeader score={0} bestScore={1024} changeAppMode={changeAppMode} />
        <GameBoard gameState={gameState} />
      </div>
    );
  }
}

Game.propTypes = {
  changeAppMode: PropTypes.func.isRequired,
};

export default Game;
