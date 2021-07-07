import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css'

const GoogleIcon = (props) => {
  return <div className={`${styles.google} ${props.className || ""}`}>
    <a href="https://www.google.com" target="_blank">
      <img src="https://books.google.com/googlebooks/images/poweredby.png" />
    </a>
  </div>
}

GoogleIcon.propTypes = {
  className: PropTypes.string,
}

export default GoogleIcon;
