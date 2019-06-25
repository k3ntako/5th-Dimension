import React from 'react';
import styles from './index.css';

export default (props) => {
  return <div className={`${styles.noImage} ${props.className}`}>
    <span>No Image</span>
  </div>
}
