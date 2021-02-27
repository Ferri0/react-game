import React from 'react';
import Menu from './menu/Menu';
import Game from './game/statefull/Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'inMenu', rate: [0, 0, 0] };
    this.changeAppMode = this.changeAppMode.bind(this);
  }

  changeAppMode(value) {
    this.setState({ mode: value });
  }

  render() {
    const { mode, rate } = this.state;
    if (mode === 'inMenu') {
      return <Menu changeAppMode={this.changeAppMode} rate={rate} />;
    }
    return <Game changeAppMode={this.changeAppMode} topScore={rate[0]} />;
  }
}

export default App;
