import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Title from '../title';
import s from './Settings.module.scss';

class Settings extends React.Component {
  returnToMain() {
    const { returnToMain } = this.props;
    returnToMain();
  }

  render() {
    const { settings, handleSettingsChange, confirmMusic } = this.props;
    return (
      <div className={s.menuBlock}>
        {Title('Settings')}
        <div className={s.settings}>
          <div className={s.line}>
            <span>Music</span>
            <label
              onChange={(e) => {
                if (e.target.checked) {
                  confirmMusic();
                }
                handleSettingsChange('music', e.target.checked);
              }}
              className={s.switch}
              htmlFor="music"
            >
              <input
                type="checkbox"
                id="music"
                defaultChecked={settings.music}
              />
              <span className={[s.slider, s.round].join(' ')} />
            </label>
          </div>
          <div className={s.line}>
            <span>Sounds</span>
            <label
              onChange={(e) => handleSettingsChange('sounds', e.target.checked)}
              className={s.switch}
              htmlFor="sounds"
            >
              <input
                type="checkbox"
                id="sounds"
                defaultChecked={settings.sounds}
              />
              <span className={[s.slider, s.round].join(' ')} />
            </label>
          </div>
          <div className={s.line}>
            <span>Volume</span>
            <input
              onChange={(e) => handleSettingsChange('volume', +e.target.value)}
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue={settings.volume}
            />
          </div>
          <div className={s.line}>
            <span>Difficulty</span>
            <select
              defaultValue={settings.difficulty}
              onChange={
                (e) => handleSettingsChange('difficulty', +e.target.value)
                // eslint-disable-next-line react/jsx-curly-newline
              }
            >
              <option value="1024">1024</option>
              <option value="2048">2048</option>
              <option value="4096">4096</option>
            </select>
          </div>
          <div className={s.line}>
            <span>Board size</span>
            <select
              defaultValue={settings.board}
              onChange={(e) => handleSettingsChange('board', +e.target.value)}
            >
              <option value="9">3x3</option>
              <option value="16">4x4</option>
              <option value="25">5x5</option>
            </select>
          </div>
          <div className={s.line}>
            <span>Theme</span>
            <select
              defaultValue={settings.theme}
              onChange={(e) => handleSettingsChange('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
        <Button
          className={s.menuButton}
          onClick={() => this.returnToMain()}
          innerText="Back"
        />
      </div>
    );
  }
}

Settings.propTypes = {
  returnToMain: PropTypes.func.isRequired,
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
};

export default Settings;
