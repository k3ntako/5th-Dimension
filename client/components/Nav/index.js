import React from 'react';
import { Link } from 'react-router-dom';
import BookSearchBar from './../BookSearchBar';
import NavOptions from './NavOptions';

import styles from './index.css';

export default (props) => {
  return <div className={styles.navWrapper}>
    <div className={styles.nav}>
      <div className={styles.titleAndSearch}>
        <Link to="/search">
          <h3 className={`websiteName ${styles.mobile}`}>5D</h3>
          <h3 className={`websiteName ${styles.desktop}`}>5th Dimension</h3>
        </Link>
        <BookSearchBar />
      </div>
      <NavOptions />
    </div>
  </div>
}
