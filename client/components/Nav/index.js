import React from 'react';
import BookSearchBar from './../BookSearchBar';

import styles from './index.css';

export default (props) => {
  return <div className={styles.nav}>
    <h1 className="websiteName">Fifth Dimension</h1>
    <h3>Five-Star Book Search Service</h3>
    <BookSearchBar />
  </div>
}
