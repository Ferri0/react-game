/* eslint-disable jsx-a11y/media-has-caption */
import React, { Fragment } from 'react';
import Menu from './menu/Menu';
import Game from './game/statefull/Game';
import InfoBlock from './InfoBlock';
import soundsObj from './audio/sounds';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'inMenu', rate: [], sounds: soundsObj.init() };
    this.changeAppMode = this.changeAppMode.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.loadSavedScore = this.loadSavedScore.bind(this);
  }

  componentDidMount() {
    this.loadSavedScore();
  }

  handleScore(score) {
    const { rate } = this.state;
    const newRate = rate;
    newRate.push(score);
    const sortedNewRate = newRate.sort((a, b) => b - a);
    if (sortedNewRate.length > 10) {
      sortedNewRate.splice(-1, 1);
    }
    this.setState({ rate: sortedNewRate });
    this.saveRateState();
  }

  loadSavedScore() {
    const storedRate = JSON.parse(localStorage.getItem('gameRate'));
    if (storedRate) {
      this.setState({ rate: storedRate });
    }
  }

  saveRateState() {
    const { rate } = this.state;
    localStorage.setItem('gameRate', JSON.stringify(rate));
  }

  changeAppMode(value) {
    const { sounds } = this.state;
    sounds.menuSound.currentTime = 0;
    sounds.menuSound.play();
    this.setState({ mode: value });
  }

  render() {
    const { mode, rate, sounds } = this.state;
    if (mode === 'inMenu') {
      return (
        <>
          <Menu
            changeAppMode={this.changeAppMode}
            rate={rate}
            sounds={sounds}
          />
          <InfoBlock />
        </>
      );
    }
    const topRate = rate[0] !== undefined ? rate[0] : 0;
    return (
      <>
        <Game
          loadSavedScore={this.loadSavedScore}
          changeAppMode={this.changeAppMode}
          topScore={topRate}
          handleScore={this.handleScore}
          sounds={sounds}
        />
        <InfoBlock />
      </>
    );
  }
}

export default App;
