/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Title from '../title';
import s from './Tutorial.module.scss';

class Tutorial extends React.Component {
  returnToMain() {
    const { returnToMain } = this.props;
    returnToMain();
  }

  render() {
    const { winNum } = this.props;
    return (
      <div className={s.menuBlock}>
        {Title('Tutorial')}
        <div className={s.tutorialBlock}>
          <div className={s.tutorialText}>
            <span>{`Join the numbers and get to ${winNum} (depends on difficulty) tile!`}</span>
            <span>
              When two tiles with the same numbers touch, they merge into one!
            </span>
            <span>It's over when the board fills up...</span>
          </div>
          <img
            className={s.tutorialImg}
            src="/assets/tutorial_2.png"
            alt="tutorial"
          />
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

Tutorial.propTypes = {
  returnToMain: PropTypes.func.isRequired,
  winNum: PropTypes.number.isRequired,
};

export default Tutorial;
