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
    const imageLink = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "";
    const authors = book.volumeInfo.authors && <span>By {book.volumeInfo.authors.join(", ")}</span>;

    return <div key={book.id}>
      <div className={styles.coverImage}>
        <Link to={`/books/${book.id}`}>
          <img src={imageLink || ""} />
        </Link>
      </div>
      <div className={styles.bookInfo}>
        <h4>
          <Link to={`/books/${book.id}`}>
            {book.volumeInfo.title}
          </Link>
        </h4>
        <h5>{book.volumeInfo.subtitle || ''}</h5>
        { authors }
      </div>
    </div>
  });

  return <div className={styles.results}>
    {booksHTML}
  </div>
}
