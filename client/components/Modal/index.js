import React from 'react';
import styles from './index.css'

export default (props) => {
  const showModalClassName = props.active ? styles.active : '';

  const title = props.title && <h3>{ props.title }</h3>;

  return <div className={`${styles.modal} ${showModalClassName}`}>
    <h3>{ props.title }</h3>
   { props.children }
  </div>
}
