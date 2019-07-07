import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookSearchBar from './../BookSearchBar';
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import styles from './index.css';

export default class Nav extends Component{
  constructor(props){
    super(props);

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

  setIsMenuActive( isMenuActive ){
    this.setState({ isMenuActive });
  }

  render(){
    const { isDarkModeOn, isMenuActive } = this.state;

    const darkModeIcon = isDarkModeOn ? <FaMoon size="1.8rem"/> : <FaSun size="1.8rem"/>;
  const menuIcon = isMenuActive ? <FaTimes size="2rem" onClick={() => this.setIsMenuActive(false)}/> :
      <FaBars size="2rem" onClick={() => this.setIsMenuActive(true)}/>;

    return <div className={styles.navWrapper}>
      <div className={styles.nav}>
        <div className={styles.titleAndSearch}>
          <Link to="/search">
            <h3 className={`websiteName ${styles.mobile}`}>5D</h3>
            <h3 className={`websiteName ${styles.desktop}`}>5th Dimension</h3>
          </Link>
          <BookSearchBar />
        </div>
        <div className={`${styles.menu} ${styles.mobile}`}>
          { menuIcon }
          <div className={`${styles.menuItems} ${isMenuActive ? styles.showMenu : ""}`}>
            <div className={styles.backgroundClick} onClick={() => this.setIsMenuActive(false)}/>
            <Link to="/about" onClick={() => this.setIsMenuActive(false)}>About 5th Dimension</Link>
            <a onClick={this.menuToggleDarkMode}>Turn {isDarkModeOn ? "Off" : "On"} Dark Mode</a>
          </div>
        </div>
        <div className={`${styles.navButtons} ${styles.desktop}`}>
          <div className={styles.settings} onClick={this.toggleDarkMode}>
            { darkModeIcon }
          </div>
          <div className={styles.info}>
            <Link to="/about"><MdInfo size="2rem"/></Link>
          </div>
        </div>
      </div>
    </div>
  }
}
