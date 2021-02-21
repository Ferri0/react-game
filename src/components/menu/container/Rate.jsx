import React from 'react';
import PropTypes from 'prop-types';
import Button from '../presentational/Button';
import Title from '../presentational/Title';

class Rate extends React.Component {
  returnToMain() {
    const { returnToMain } = this.props;
    returnToMain();
  }

  render() {
    return (
      <div className="menu">
        {Title('Rating')}
        <div className="menu__leaderboard">LEADERBOARD</div>
        <Button
          className="menu__button"
          onClick={() => this.returnToMain()}
          innerText="Back"
        />
      </div>
    );
  }
}

Rate.propTypes = {
  returnToMain: PropTypes.func.isRequired,
};

export default Rate;
