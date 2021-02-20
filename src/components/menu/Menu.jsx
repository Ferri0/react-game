import React from 'react';
import PropTypes from 'prop-types';
import Main from './Main';
import Challenges from './Challenges';
import Settings from './Settings';
import Rate from './Rate';
import Tutorial from './Tutorial';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuPage: 'main' };
    this.setMenuPage = this.setMenuPage.bind(this);
    this.returnToMain = this.returnToMain.bind(this);
  }

  // @value is name of button
  setMenuPage(value) {
    this.setState({ menuPage: value });
  }

  returnToMain() {
    this.setState({ menuPage: 'main' });
  }

  render() {
    const { menuPage } = this.state;
    const { changeAppMode } = this.props;
    if (menuPage === 'main') {
      return (
        <Main setMenuPage={this.setMenuPage} changeAppMode={changeAppMode} />
      );
    }
    if (menuPage === 'challenges') {
      return <Challenges returnToMain={this.returnToMain} />;
    }
    if (menuPage === 'settings') {
      return <Settings returnToMain={this.returnToMain} />;
    }
    if (menuPage === 'rate') {
      return <Rate returnToMain={this.returnToMain} />;
    }
    if (menuPage === 'tutorial') {
      return <Tutorial returnToMain={this.returnToMain} />;
    }
    return Error('Wrong value of menuPage state property in Menu component');
  }
}

Menu.propTypes = {
  changeAppMode: PropTypes.func.isRequired,
};

export default Menu;
