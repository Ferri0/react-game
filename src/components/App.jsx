/* eslint-disable jsx-a11y/media-has-caption */
import React, { Fragment } from 'react';
import Menu from './menu/Menu';
import Game from './game/statefull/Game';
import InfoBlock from './InfoBlock';
import SoundModal from './soundModal/SoundModal';
import soundsObj from './audio/sounds';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inMenu',
      autoplay: false,
      rate: [],
      settings: {
        music: false,
        sounds: true,
        volume: 1,
        difficulty: 2048,
        board: 16,
        theme: 'light',
      },
      sounds: soundsObj.init(),
      musicConfirmed: false,
    };
    this.changeAppMode = this.changeAppMode.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.loadSavedScore = this.loadSavedScore.bind(this);
    this.loadSavedSettings = this.loadSavedSettings.bind(this);
    this.confirmMusic = this.confirmMusic.bind(this);
    this.setAutoplayMode = this.setAutoplayMode.bind(this);
  }

  componentDidMount() {
    this.loadSavedScore();
    this.loadSavedSettings();
  }

  componentDidUpdate(prevState) {
    const { settings, sounds } = this.state;
    if (!settings.music) {
      document.getElementById('bgSound').pause();
    }
    if (prevState?.settings?.volume !== settings.volume) {
      const volume = settings.volume / 10;
      sounds.setVolume(volume);
    }
    this.saveSettingsState();
  }

  handleSettingsChange(setting, value) {
    const { sounds, settings: currentSettings } = this.state;

    if (currentSettings.sounds) {
      sounds.settingsSound.currentTime = 0;
      sounds.settingsSound.play();
    }

    this.setState((prevState) => {
      const settings = { ...prevState.settings };
      settings[setting] = value;
      return { settings };
    });

    if (value >= 9) localStorage.setItem('gameState', null);

    if (value === 'dark') {
      document.body.classList.add('dark-theme');
    } else if (value === 'light') {
      document.body.classList.remove('dark-theme');
    }
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

  setAutoplayMode(isEnabled) {
    const { sounds, settings } = this.state;
    if (settings.sounds) {
      sounds.menuSound.currentTime = 0;
      sounds.menuSound.play();
    }
    if (isEnabled) {
      this.setState({ autoplay: true, mode: 'inGame' });
    } else {
      this.setState({ autoplay: false, mode: 'inMenu' });
      setTimeout(() => {
        localStorage.setItem('gameState', null);
      }, 100);
    }
  }

  loadSavedScore() {
    const storedRate = JSON.parse(localStorage.getItem('gameRate'));
    if (storedRate) {
      this.setState({ rate: storedRate });
    }
  }

  loadSavedSettings() {
    const storedSettings = JSON.parse(localStorage.getItem('settings'));
    if (storedSettings) {
      this.setState({ settings: storedSettings });
    }
  }

  saveRateState() {
    const { rate } = this.state;
    localStorage.setItem('gameRate', JSON.stringify(rate));
  }

  saveSettingsState() {
    const { settings } = this.state;
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  changeAppMode(value) {
    const { sounds, settings } = this.state;
    if (settings.sounds) {
      sounds.menuSound.currentTime = 0;
      sounds.menuSound.play();
    }
    this.setState({ mode: value });
  }

  confirmMusic() {
    this.setState({
      musicConfirmed: true,
    });
    document.getElementById('bgSound').play();
  }

  render() {
    const {
      mode,
      rate,
      sounds,
      settings,
      musicConfirmed,
      autoplay,
    } = this.state;
    if (mode === 'inMenu') {
      return (
        <>
          <Menu
            setAutoplayMode={this.setAutoplayMode}
            changeAppMode={this.changeAppMode}
            rate={rate}
            sounds={sounds}
            settings={settings}
            confirmMusic={this.confirmMusic}
            handleSettingsChange={this.handleSettingsChange}
          />
          {SoundModal(settings.music, musicConfirmed, this.confirmMusic)}
          <InfoBlock />
          <audio
            id="bgSound"
            key="bgSound"
            loop
            src="/assets/audio/menu-bg.wav"
          />
        </>
      );
    }
    const topRate = rate[0] !== undefined ? rate[0] : 0;
    return (
      <>
        <Game
          setAutoplayMode={this.setAutoplayMode}
          loadSavedScore={this.loadSavedScore}
          changeAppMode={this.changeAppMode}
          topScore={topRate}
          handleScore={this.handleScore}
          sounds={sounds}
          settings={settings}
          autoplay={autoplay}
        />
        <InfoBlock />
        <audio
          id="bgSound"
          key="bgSound"
          loop
          src="/assets/audio/menu-bg.wav"
        />
      </>
    );
  }
}

export default App;
