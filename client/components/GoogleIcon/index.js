import React from 'react';
import styles from './index.css'

export default (props) => {
  return <div className={`${styles.google} ${props.className || ""}`}>
    <a href="https://www.google.com" target="_blank">
      <img src="https://books.google.com/googlebooks/images/poweredby.png" />
    </a>
  </div>
}
