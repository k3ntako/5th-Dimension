import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavOptionsDesktop from './NavOptionsDesktop';
import NavOptionsMobile from './NavOptionsMobile';
import DarkMode from '../../models/DarkMode';

import styles from './index.css';

export default class NavOptions extends Component{
  constructor(){
    super();

    this.state = {
      darkMode: new DarkMode,
      isMenuActive: false,
    };
  }

  menuToggleDarkMode = () => {
    this.state.darkMode.toggleDarkMode();

    this.setState({
      isMenuActive: false
    });
  }

  setIsMenuActive = ( isMenuActive ) => {
    this.setState({ isMenuActive });
  }

  toggleDarkMode = () => {
    this.state.darkMode.toggleDarkMode();
    this.forceUpdate();
  }

  render(){
    const { darkMode, isMenuActive } = this.state;
    const isDarkModeOn = darkMode.isDarkModeOn;

    return <>
      <NavOptionsMobile
        isDarkModeOn={isDarkModeOn}
        isMenuActive={isMenuActive}
        menuToggleDarkMode={this.menuToggleDarkMode}
        setIsMenuActive={this.setIsMenuActive} />
      <NavOptionsDesktop
        isDarkModeOn={isDarkModeOn}
        toggleDarkMode={this.toggleDarkMode} />
    </>
  }
}
