import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList } from "react-icons/fa";
import { FaTable } from "react-icons/fa";

import styles from './Results.css';

export default (props) => {
  const [isTable, setIsTable] = useState(true);

  const books = props.books;
  if( !books || !books.length ){
    return <h3>No Results</h3>;
  }

  let booksHTML;
  booksHTML = books.map(book => {
    if( !book || book.volumeInfo ){
      return null;
    }

    const imageLink = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "";
    const authors = book.volumeInfo.authors && <span>By {book.volumeInfo.authors.join(", ")}</span>;

    return <div key={book.id} className={styles.resultBox}>
      <div className={styles.coverImage}>
        <Link to={`/books/${book.id}`}>
          <img src={imageLink || ""} />
        </Link>
      </div>
      <div className={styles.bookInfo}>
        <h5>
          <Link to={`/books/${book.id}`}>
            {book.volumeInfo.title}
          </Link>
        </h5>
        { book.volumeInfo.subtitle && <h6>{book.volumeInfo.subtitle || ''}</h6> }
        { authors }
      </div>
    </div>
  });

  const icon = isTable ? <FaList size={"1.7rem"} /> : <FaTable size={"1.7rem"} />;
  const gridClassName = isTable ? styles.table : styles.list;

  return <div>
    <div className={styles.header}>
      <h3>{props.title}</h3>
      <div className={styles.buttons}>
        <button onClick={() => setIsTable(!isTable)}>{icon}</button>
      </div>
    </div>
    <div className={`${styles.resultsGrid} ${gridClassName}`}>
      {booksHTML}
    </div>
  </div>
}
