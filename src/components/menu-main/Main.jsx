import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import s from './Main.module.scss';

// TODO: remove this comment and create functional component?
// eslint-disable-next-line react/prefer-stateless-function
class Main extends React.Component {
  render() {
    const { changeAppMode, setMenuPage, setAutoplayMode } = this.props;
    const menuBtnsNames = [
      'Keep Going',
      'New Game',
      'Autoplay',
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
            className={s.menuButton}
            onClick={() => {
              if (btnName.toLowerCase() === 'new game') {
                localStorage.setItem('gameState', null);
              }
              changeAppMode('inGame');
            }}
            innerText={btnName}
          />
        );
      }

      if (btnName.toLowerCase() === 'autoplay') {
        return (
          <Button
            key="autoplay"
            className={s.menuButton}
            onClick={() => setAutoplayMode(true)}
            innerText={btnName}
          />
        );
      }

      if (btnName.toLowerCase() === 'how to play') {
        return (
          <Button
            key="tutorial"
            className={s.menuButton}
            onClick={() => setMenuPage('tutorial')}
            innerText={btnName}
          />
        );
      }

      return (
        <Button
          key={btnName}
          className={s.menuButton}
          onClick={() => setMenuPage(btnName.toLowerCase())}
          innerText={btnName}
        />
      );
    });
    return <div className={s.menuBlock}>{menuBtnsElements}</div>;
  }
}

Main.propTypes = {
  setMenuPage: PropTypes.func.isRequired,
  changeAppMode: PropTypes.func.isRequired,
  setAutoplayMode: PropTypes.func.isRequired,
};

export default Main;
