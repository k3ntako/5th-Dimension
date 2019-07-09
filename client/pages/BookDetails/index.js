import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import FetchFailed from './FetchFailed';
import NoImage from '../../components/NoImage';
import AbortableFetchGoogle from '../../models/AbortableFetchGoogle';
import { googleBooksURL, bookFields } from '../../utilities/GoogleBooksURL';
import { parseBookInfo } from '../../utilities/ParseBookInfo';

import styles from './index.css';

const DOMPurifyOptions = {
  ALLOWED_TAGS: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'ul', 'ol', 'li',
  'b', 'i', 'u', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'sup', 'sub',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span', ],
}

const additionVInfoFields = "categories,description,industryIdentifiers,pageCount,previewLink,publishedDate";
const FIELDS = bookFields({ imageType: "small", additionVInfoFields });

export default class BookDetails extends Component {

  constructor(props){
    super(props);

    this.state = {
      bookFetch: null,
      fetchFailed: false
    };

    this.fetch = null;
  }

  async componentDidMount(){
    try{
      this.fetch = new AbortableFetchGoogle;
      const link = googleBooksURL({
        params: this.props.match.params.id,
        search: FIELDS
      });

      await this.fetch.aFetch( link );

      if( this.fetch.fetchSucessful ){
        this.setState({ bookFetch: this.fetch });
      }else if( !this.fetch.didAbort ){
        this.setState({ fetchFailed: true });
      }
    }catch( err ){
      console.error(err);
    }
  }

  componentWillUnmount(){
    this.fetch.abort();
  }

  render(){
    const { bookFetch, fetchFailed } = this.state;
    if( fetchFailed ){
      return <FetchFailed />
    }else if( !bookFetch ){
      return null;
    }

    const book = bookFetch.first;
    const vInfo = book.volumeInfo;

    if (!vInfo) {
      return null
    }

    const sanitizedDescription = DOMPurify.sanitize(vInfo.description, DOMPurifyOptions);
    const imageLink = vInfo.imageLinks && vInfo.imageLinks.small;

    const bookCover = imageLink ? <img className={styles.coverImage} src={imageLink} /> : <NoImage className={styles.coverImage} />;

    const parsedVInfo = parseBookInfo(vInfo);
    const bookInfoHTML = parsedVInfo.map(dataPoint => {
      return <div key={dataPoint.title}>
        <strong>{ dataPoint.title }</strong>: { dataPoint.info }
      </div>
    });

    return <section className="page">
      <h2 className={styles.title}>{vInfo.title}</h2>
      <h4 className={styles.subtitle}>{vInfo.subtitle || ''}</h4>
      <div className={styles.details}>
        { bookCover }
        <div className={styles.info}>
          { bookInfoHTML }
          <div>
            <p>
              <a href={vInfo.previewLink} target="_blank">More at Google Books</a>
            </p>
          </div>
        </div>
        <div className={styles.description}
          dangerouslySetInnerHTML={{__html: sanitizedDescription}}>
        </div>
      </div>
    </section>
  }
}

BookDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}
