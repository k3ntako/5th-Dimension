import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './index.css';

const TITLE = "Uh oh!";
const MESSAGE = "Couldn't find the page you were looking for.";

const ErrorMessage = (props) => {
  return <section className={`page ${styles.notFound}`}>
    <h1>{props.title || TITLE}</h1>
    <h3>{props.message || MESSAGE}</h3>
    <h3>
      <Link to="/search">Return Home</Link>
    </h3>
  </section>
}

ErrorMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
}

export default ErrorMessage;
