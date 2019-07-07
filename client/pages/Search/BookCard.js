import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NoImage from '../../components/NoImage';

import styles from './Results.css';

const BookCard = (props) => {
  if( !props.book || !props.book.volumeInfo ){
    return null;
  }

  const volumeInfo = props.book.volumeInfo;

  const imageLink = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : "";
  const bookCover = imageLink ? <img src={imageLink} /> : <NoImage className={styles.noImage}/>;

  const authors = volumeInfo.authors && <p>By {volumeInfo.authors.join(", ")}</p>;
  const publisher = volumeInfo.publisher && <p>Publisher: {volumeInfo.publisher}</p>;

  return <div className={styles.resultBox}>
    <div className={styles.coverImage}>
      <Link to={`/books/${props.book.id}`}>
        { bookCover }
      </Link>
    </div>
    <div className={styles.bookInfo}>
      <h5>
        <Link to={`/books/${props.book.id}`}>
          { volumeInfo.title }
        </Link>
      </h5>
      { volumeInfo.subtitle && <h6>{volumeInfo.subtitle}</h6> }
      { authors }
      { publisher }
    </div>
  </div>
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    volumeInfo: PropTypes.shape({
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
      }),
      authors: PropTypes.arrayOf(PropTypes.string),
      publisher: PropTypes.string,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
    }),
  }),
}

export default BookCard;
