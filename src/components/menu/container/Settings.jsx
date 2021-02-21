import React from 'react';
import PropTypes from 'prop-types';
import Button from '../presentational/Button';
import Title from '../presentational/Title';

class Settings extends React.Component {
  returnToMain() {
    const { returnToMain } = this.props;
    returnToMain();
  }

  render() {
    return (
      <div className="menu">
        {Title('Settings')}
        <div className="menu__settings">SETTINGS</div>
        <Button
          className="menu__button"
          onClick={() => this.returnToMain()}
          innerText="Back"
        />
      </div>
    );
  }
}

Settings.propTypes = {
  returnToMain: PropTypes.func.isRequired,
};

export default Settings;
