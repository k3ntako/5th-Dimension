import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.css';

export default (props) => {
  return <section className={`page ${styles.notFound}`}>
    <h1>Uh oh!</h1>
    <h3>Couldn't find the page you were looking for.</h3>
    <h3>
      <Link to="/search">Return Home</Link>
    </h3>
  </section>
}
