import React from 'react';
import Menu from './menu/Menu';
import Game from './game/statefull/Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'inMenu', rate: [] };
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
    this.setState({ mode: value });
  }

  render() {
    const { mode, rate } = this.state;
    if (mode === 'inMenu') {
      return <Menu changeAppMode={this.changeAppMode} rate={rate} />;
    }
    const topRate = rate[0] !== undefined ? rate[0] : 0;
    return (
      <Game
        loadSavedScore={this.loadSavedScore}
        changeAppMode={this.changeAppMode}
        topScore={topRate}
        handleScore={this.handleScore}
      />
    );
  }
}

export default App;
