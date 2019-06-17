import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookSearchBar from './../BookSearchBar';
import { MdSettings } from "react-icons/md";
import { MdInfo } from "react-icons/md";

import styles from './index.css';

export default (props) => {
  const [ settingActive, setSettingActive ] = useState(false);

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
        <div className={styles.settings} onClick={() => setSettingActive(!settingActive)}>
          <MdSettings size="2rem"/>
        </div>
        <div className={styles.info}>
          <Link to="/about"><MdInfo size="2rem"/></Link>
        </div>
      </div>
    </div>
  </div>
}
