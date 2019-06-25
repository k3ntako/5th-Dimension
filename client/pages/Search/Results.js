import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList } from "react-icons/fa";
import { FaTable } from "react-icons/fa";

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
    if( !book || !book.volumeInfo ){
      return null;
    }

    const imageLink = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "";
    const bookCover = imageLink ? <img src={imageLink} /> : <NoImage className={styles.noImage}/>;

    const authors = book.volumeInfo.authors && <p>By {book.volumeInfo.authors.join(", ")}</p>;
    const publisher = book.volumeInfo.publisher && <p>Publisher: {book.volumeInfo.publisher}</p>;

    return <div key={book.id} className={styles.resultBox}>
      <div className={styles.coverImage}>
        <Link to={`/books/${book.id}`}>
          { bookCover }
        </Link>
      </div>
      <div className={styles.bookInfo}>
        <h5>
          <Link to={`/books/${book.id}`}>
            { book.volumeInfo.title }
          </Link>
        </h5>
        { book.volumeInfo.subtitle && <h6>{book.volumeInfo.subtitle}</h6> }
        { authors }
        { publisher }
      </div>
    </div>
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
