import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavOptionsDesktop from './NavOptionsDesktop';
import NavOptionsMobile from './NavOptionsMobile';

import styles from './index.css';

export default class NavOptions extends Component{
  constructor(){
    super();

    this.state = {
      isDarkModeOn: false,
      isMenuActive: false,
    };
  }

  componentDidMount(){
    const darkModeStatus = localStorage.getItem('dark-mode');
    this.setState({
      isDarkModeOn: darkModeStatus === "on"
    });

    document.getElementsByTagName("body")[0].setAttribute("dark-mode", darkModeStatus);
  }

  toggleDarkMode = () => {
    const darkModeStatus = this.state.isDarkModeOn ? "off" : "on";
    document.getElementsByTagName("body")[0].setAttribute("dark-mode", darkModeStatus);
    localStorage.setItem('dark-mode', darkModeStatus);
    this.setState( state => {
      return {
        isDarkModeOn: !state.isDarkModeOn
      }
    });
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
    const { isDarkModeOn, isMenuActive } = this.state;

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
