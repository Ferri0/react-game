import React from 'react';
import PropTypes from 'prop-types';
import Button from '../utility/Button';
import Title from './Title';

class Challenges extends React.Component {
  returnToMain() {
    const { returnToMain } = this.props;
    returnToMain();
  }

  render() {
    return (
      <div className="menu">
        {Title('Challenges')}
        <div className="menu__challenges">CHALLENGES</div>
        <Button
          className="menu__button"
          onClick={() => this.returnToMain()}
          innerText="Back"
        />
      </div>
    );
  }
}

Challenges.propTypes = {
  returnToMain: PropTypes.func.isRequired,
};

export default Challenges;
