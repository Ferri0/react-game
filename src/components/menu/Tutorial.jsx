import React from 'react';
import PropTypes from 'prop-types';
import Button from '../utility/Button';
import Title from './Title';

class Tutorial extends React.Component {
  returnToMain() {
    const { returnToMain } = this.props;
    returnToMain();
  }

  render() {
    return (
      <div className="menu">
        {Title('Tutorial')}
        <div className="menu__tutorial">TUTORIAL</div>
        <Button
          className="menu__button"
          onClick={() => this.returnToMain()}
          innerText="Back"
        />
      </div>
    );
  }
}

Tutorial.propTypes = {
  returnToMain: PropTypes.func.isRequired,
};

export default Tutorial;
