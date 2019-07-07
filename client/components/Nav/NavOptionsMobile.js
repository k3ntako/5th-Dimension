import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import styles from './index.css';

export default (props) => {
  const openMenu = () => props.setIsMenuActive(true);
  const closeMenu = () => props.setIsMenuActive(false);

  const menuIcon = props.isMenuActive ? <FaTimes size="2rem" onClick={closeMenu}/> :
    <FaBars size="2rem" onClick={openMenu}/>;

  return <div className={`${styles.menu} ${styles.mobile}`}>
    { menuIcon }
    <div className={`${styles.menuItems} ${props.isMenuActive ? styles.showMenu : ""}`}>
      <div className={styles.backgroundClick} onClick={closeMenu} />
      <Link to="/about" onClick={closeMenu}>About 5th Dimension</Link>
      <a onClick={props.menuToggleDarkMode}>Turn {props.isDarkModeOn ? "Off" : "On"} Dark Mode</a>
    </div>
  </div>
}
