import React from 'react';
import PropTypes from 'prop-types';
import Main from './container/Main';
import Challenges from './container/Challenges';
import Settings from './container/Settings';
import Rate from './container/Rate';
import Tutorial from './container/Tutorial';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuPage: 'main' };
    this.setMenuPage = this.setMenuPage.bind(this);
    this.returnToMain = this.returnToMain.bind(this);
  }

  // @value is name of button
  setMenuPage(value) {
    const { sounds } = this.props;
    sounds.menuSound.currentTime = 0;
    sounds.menuSound.play();
    this.setState({ menuPage: value });
  }

  returnToMain() {
    const { sounds } = this.props;
    sounds.menuSound.currentTime = 0;
    sounds.menuSound.play();
    this.setState({ menuPage: 'main' });
  }

  render() {
    const { menuPage } = this.state;
    const { changeAppMode, rate } = this.props;
    if (menuPage === 'main') {
      return (
        <Main setMenuPage={this.setMenuPage} changeAppMode={changeAppMode} />
      );
    }
    if (menuPage === 'challenges') {
      return <Challenges returnToMain={this.returnToMain} />;
    }
    if (menuPage === 'settings') {
      return <Settings returnToMain={this.returnToMain} />;
    }
    if (menuPage === 'rate') {
      return <Rate returnToMain={this.returnToMain} rate={rate} />;
    }
    if (menuPage === 'tutorial') {
      return <Tutorial returnToMain={this.returnToMain} />;
    }
    return Error('Wrong value of menuPage state property in Menu component');
  }
}

Menu.propTypes = {
  changeAppMode: PropTypes.func.isRequired,
  rate: PropTypes.arrayOf(PropTypes.number).isRequired,
  sounds: PropTypes.shape({
    shiftSound: PropTypes.instanceOf(Audio),
    menuSound: PropTypes.instanceOf(Audio).isRequired,
    bgSound: PropTypes.instanceOf(Audio).isRequired,
    loseGame: PropTypes.instanceOf(Audio).isRequired,
    winGame: PropTypes.instanceOf(Audio).isRequired,
    newGame: PropTypes.instanceOf(Audio).isRequired,
    setVolume: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired,
  }).isRequired,
};

export default Menu;
