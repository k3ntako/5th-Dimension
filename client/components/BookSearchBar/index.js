import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { IoMdBook } from "react-icons/io";
import styles from './index.css';


const BookSearchBar = (props) => {
  const [search, setSearch] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    props.history.push(`/search?q=${search}&p=0`)
  }

  const hasTextClassName = !!search.length ? styles.hasText : "";

  return <form className={styles.searchForm} onSubmit={onSubmit}>
    <input
      className={`${styles.searchBar} ${hasTextClassName}`}
      value={search}
      onChange={(e) => setSearch(e.target.value)} />
    <button className={styles.searchButton}><IoMdBook size={"1.5rem"} /></button>
  </form>
}

export default withRouter(BookSearchBar);
