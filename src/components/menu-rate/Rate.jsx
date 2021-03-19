import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Title from '../title';
import s from './Rate.module.scss';

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
          <div className={s.score} key={score}>
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
          <div className={s.score} key={i}>
            empty
          </div>
        );
      }
    }

    return (
      <div className={s.menuBlock}>
        {Title('Rating')}
        <div className={s.rateBlock}>{rating}</div>
        <Button
          className={s.menuButton}
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
