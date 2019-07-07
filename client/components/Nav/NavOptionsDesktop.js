import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { MdInfo } from "react-icons/md";

import styles from './index.css';

export default (props) => {
  const darkModeIcon = props.isDarkModeOn ? <FaMoon size="1.8rem"/> : <FaSun size="1.8rem"/>;

  return <div className={`${styles.navButtons} ${styles.desktop}`}>
    <div className={styles.settings} onClick={props.toggleDarkMode}>
      { darkModeIcon }
    </div>
    <div className={styles.info}>
      <Link to="/about"><MdInfo size="2rem"/></Link>
    </div>
  </div>
}
