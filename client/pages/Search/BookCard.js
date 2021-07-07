import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NoImage from '../../components/NoImage';
import { parseBookInfo } from '../../utilities/ParseBookInfo';

import styles from './Results.css';

const BookCard = (props) => {
  if( !props.book || !props.book.volumeInfo ){
    return null;
  }

  const vInfo = props.book.volumeInfo;

  const imageLink = vInfo.imageLinks ? vInfo.imageLinks.thumbnail : "";
  const bookCover = imageLink ? <img src={imageLink} /> : <NoImage className={styles.noImage}/>;

  const parsedVInfo = parseBookInfo(vInfo);
  const bookInfoHTML = parsedVInfo.map(dataPoint => {
    return <p key={dataPoint.title}>
      { dataPoint.title }: { dataPoint.info }
    </p>
  });

  return <div className={styles.resultBox}>
    <div className={styles.coverImage}>
      <Link to={`/books/${props.book.id}`}>
        { bookCover }
      </Link>
    </div>
    <div className={styles.bookInfo}>
      <h5>
        <Link to={`/books/${props.book.id}`}>
          { vInfo.title }
        </Link>
      </h5>
      { vInfo.subtitle && <h6>{vInfo.subtitle}</h6> }
      { bookInfoHTML }
    </div>
  </div>
}

BookCard.propTypes = {
  book: PropTypes.exact({
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
