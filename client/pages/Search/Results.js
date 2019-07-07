import React, { useState } from 'react';
import { FaList } from "react-icons/fa";
import { FaTable } from "react-icons/fa";

import BookCard from './BookCard';
import NoImage from '../../components/NoImage';
import styles from './Results.css';

export default (props) => {
  const [isTable, setIsTable] = useState(true);

  const books = props.books;
  if( props.noResults ){
    return <h4>No Books Found</h4>;
  }else if( !books || !books.length ){
    return <h4>Searching...</h4>;
  }

  let booksHTML = books.map(book => {
    return <BookCard key={book.id} book={book} />
  });

  const icon = isTable ? <FaList size={"1.7rem"} /> : <FaTable size={"1.7rem"} />;
  const gridClassName = isTable ? styles.table : styles.list;

  return <div>
    <div className={styles.header}>
      <h4>{props.title}</h4>
      <button onClick={() => setIsTable(!isTable)}>{icon}</button>
    </div>
    <div className={`${styles.resultsGrid} ${gridClassName}`}>
      {booksHTML}
    </div>
  </div>
}
