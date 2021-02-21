import React from 'react';
import PropTypes from 'prop-types';
import Button from '../presentational/Button';

// TODO: remove this comment and create functional component?
// eslint-disable-next-line react/prefer-stateless-function
class Main extends React.Component {
  render() {
    const { changeAppMode, setMenuPage } = this.props;
    const menuBtnsNames = [
      'Keep Going',
      'New Game',
      'Challenges',
      'Settings',
      'How To Play',
      'Rate',
    ];
    const menuBtnsElements = menuBtnsNames.map((btnName) => {
      if (
        btnName.toLowerCase() === 'keep going' ||
        btnName.toLowerCase() === 'new game'
      ) {
        return (
          <Button
            key={btnName}
            className="menu__button"
            onClick={() => changeAppMode('inGame')}
            innerText={btnName}
          />
        );
      }

      if (btnName.toLowerCase() === 'how to play') {
        return (
          <Button
            key="tutorial"
            className="menu__button"
            onClick={() => setMenuPage('tutorial')}
            innerText={btnName}
          />
        );
      }

      return (
        <Button
          key={btnName}
          className="menu__button"
          onClick={() => setMenuPage(btnName.toLowerCase())}
          innerText={btnName}
        />
      );
    });
    return <div className="menu">{menuBtnsElements}</div>;
  }
}

Main.propTypes = {
  setMenuPage: PropTypes.func.isRequired,
  changeAppMode: PropTypes.func.isRequired,
};

export default Main;
