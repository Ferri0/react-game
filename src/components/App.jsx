import React from 'react';
import Menu from './menu/Menu';
import Game from './game/statefull/Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'inMenu' };
    this.changeAppMode = this.changeAppMode.bind(this);
  }

  changeAppMode(value) {
    this.setState({ mode: value });
  }

  render() {
    const { mode } = this.state;
    if (mode === 'inMenu') {
      return <Menu changeAppMode={this.changeAppMode} />;
    }
    return <Game changeAppMode={this.changeAppMode} />;
  }
}

export default App;
