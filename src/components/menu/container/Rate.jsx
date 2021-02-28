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
    const { rate } = this.props;

    const rating = rate.map((score) => {
      if (score > 0) {
        return (
          <div className="menu__leaderboard--score" key={score}>
            {score}
          </div>
        );
      }
      return false;
    });

    if (rating.length < 10) {
      const emptyRates = 10 - rating.length;
      for (let i = 0; i < emptyRates; i += 1) {
        rating.push(
          <div className="menu__leaderboard--score" key={i}>
            empty
          </div>
        );
      }
    }

    return (
      <div className="menu">
        {Title('Rating')}
        <div className="menu__leaderboard">{rating}</div>
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
  rate: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Rate;
