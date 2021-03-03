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

  setMenuPage(value) {
    const { sounds, settings } = this.props;
    if (settings.sounds) {
      sounds.menuSound.currentTime = 0;
      sounds.menuSound.play();
    }
    this.setState({ menuPage: value });
  }

  returnToMain() {
    const { sounds, settings } = this.props;
    if (settings.sounds) {
      sounds.menuSound.currentTime = 0;
      sounds.menuSound.play();
    }
    this.setState({ menuPage: 'main' });
  }

  render() {
    const { menuPage } = this.state;
    const {
      changeAppMode,
      rate,
      settings,
      handleSettingsChange,
      confirmMusic,
      setAutoplayMode,
    } = this.props;
    if (menuPage === 'main') {
      return (
        <Main
          setMenuPage={this.setMenuPage}
          changeAppMode={changeAppMode}
          setAutoplayMode={setAutoplayMode}
        />
      );
    }
    if (menuPage === 'challenges') {
      return <Challenges returnToMain={this.returnToMain} />;
    }
    if (menuPage === 'settings') {
      return (
        <Settings
          returnToMain={this.returnToMain}
          settings={settings}
          handleSettingsChange={handleSettingsChange}
          confirmMusic={confirmMusic}
        />
      );
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
  handleSettingsChange: PropTypes.func.isRequired,
  confirmMusic: PropTypes.func.isRequired,
  setAutoplayMode: PropTypes.func.isRequired,
};

export default Menu;
