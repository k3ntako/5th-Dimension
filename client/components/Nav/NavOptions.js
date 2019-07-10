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
      DarkMode: new DarkMode,
      isMenuActive: false,
    };
  }

  menuToggleDarkMode = () => {
    this.setState({
      isMenuActive: false
    }, this.toggleDarkMode);
  }

  setIsMenuActive = ( isMenuActive ) => {
    this.setState({ isMenuActive });
  }

  render(){
    const { DarkMode, isMenuActive } = this.state;
    const isDarkModeOn = DarkMode.isDarkModeOn;

    return <>
      <NavOptionsMobile
        isDarkModeOn={isDarkModeOn}
        isMenuActive={isMenuActive}
        menuToggleDarkMode={DarkMode.toggleDarkMode}
        setIsMenuActive={this.setIsMenuActive} />
      <NavOptionsDesktop
        isDarkModeOn={isDarkModeOn}
        toggleDarkMode={DarkMode.toggleDarkMode} />
    </>
  }
}
