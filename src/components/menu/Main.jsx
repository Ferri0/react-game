import React from 'react';
import PropTypes from 'prop-types';
import Button from '../utility/Button';

// TODO: remove this comment and create functional component?
// eslint-disable-next-line react/prefer-stateless-function
class Main extends React.Component {
  render() {
    const { changeAppMode, setMenuPage } = this.props;
    const menuBtnsNames = [
      'keep going',
      'new game',
      'challenges',
      'settings',
      'how to play',
      'rate',
    ];
    const menuBtnsElements = menuBtnsNames.map((btnName) => {
      if (btnName === 'keep going' || btnName === 'new game') {
        return (
          <Button
            key={btnName}
            className="menu__button"
            onClick={() => changeAppMode('inGame')}
            innerText={btnName}
          />
        );
      }

      if (btnName === 'how to play') {
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
          onClick={() => setMenuPage(btnName)}
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
