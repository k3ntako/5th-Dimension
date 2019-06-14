import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Results.css';

export default (props) => {
  const books = props.books;
  if( !books || !books.length ){
    return null;
  }

  let booksHTML;
  booksHTML = books.map(book => {
    let imageLink = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "";

    return <div key={book.id} className={styles.book}>
      <div>
        <a href={book.volumeInfo.canonicalVolumeLink} target='_blank'>
          <img src={imageLink || ""} />
        </a>
      </div>
      <div className={styles.bookInfo}>
        <h4>
          <a href={book.volumeInfo.canonicalVolumeLink} target='_blank'>
            {book.volumeInfo.title}
          </a>
        </h4>
        <p className={styles.subtitle || ''}>{book.volumeInfo.subtitle}</p>
        <p>By {book.volumeInfo.authors.join(", ")}</p>
      </div>
    </div>
  });

  return <div className={styles.results}>
    {booksHTML}
  </div>
}
