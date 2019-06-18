import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookSearchBar from './../BookSearchBar';
import Modal from './../Modal';
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { MdInfo } from "react-icons/md";

import styles from './index.css';

export default (props) => {
  const [ isDarkModeOn, setIsDarkModeOn ] = useState(false);

  // Acts as componentDidMount
  useEffect(() => {
    const darkModeStatus = localStorage.getItem('dark-mode');
    setIsDarkModeOn(darkModeStatus === "on");
    document.getElementsByTagName("body")[0].setAttribute("dark-mode", darkModeStatus);
  }, []);

  const toggleDarkMode = () => {
    const darkModeStatus = isDarkModeOn ? "off" : "on";
    document.getElementsByTagName("body")[0].setAttribute("dark-mode", darkModeStatus);
    localStorage.setItem('dark-mode', darkModeStatus);
    setIsDarkModeOn(!isDarkModeOn);
  }

  const darkModeIcon = isDarkModeOn ? <FaMoon size="1.8rem"/> : <FaSun size="1.8rem"/>;

  return <div className={styles.navWrapper}>
    <div className={styles.nav}>
      <div className={styles.titleAndSearch}>
        <Link to="/search">
          <h3 className={`websiteName ${styles.mobile}`}>5D</h3>
          <h3 className={`websiteName ${styles.desktop}`}>5th Dimension</h3>
        </Link>
        <BookSearchBar />
      </div>
      <div className={styles.buttons}>
        <div className={styles.settings} onClick={toggleDarkMode}>
          { darkModeIcon }
        </div>
        <div className={styles.info}>
          <Link to="/about"><MdInfo size="2rem"/></Link>
        </div>
      </div>
    </div>
  </div>
}
