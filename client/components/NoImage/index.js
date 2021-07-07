import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

const NoImage = (props) => {
  return <div className={`${styles.noImage} ${props.className || ""}`}>
    <span>No Image</span>
  </div>
}

NoImage.propTypes = {
  className: PropTypes.string,
}

export default NoImage;
