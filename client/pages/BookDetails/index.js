import React, {Component} from 'react';
import styles from './index.css';
import DOMPurify from 'dompurify';

const DOMPurifyOptions = {
  ALLOWED_TAGS: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'ul', 'ol', 'li',
  'b', 'i', 'u', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'sup', 'sub',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span', ],
}

export default class BookDetails extends Component {

  constructor(props){
    super(props);

    this.state = {
      book: null
    };

  }

  componentDidMount(){
    fetch(`https://www.googleapis.com/books/v1/volumes/${this.props.match.params.id}`).
      then(response => response.json()).
      then(book => {
        this.setState({ book });
      })
  }

  render(){
    const { book } = this.state;

    if( !book ){
      return null;
    }

    const { volumeInfo } = book;

    const sanitizedDescription = DOMPurify.sanitize(volumeInfo.description, DOMPurifyOptions);
    const imageLink = volumeInfo.imageLinks && volumeInfo.imageLinks.small;

    return <section className="page">
      <h1 className={styles.title}>{volumeInfo.title}</h1>
      <h4 className={styles.subtitle}>{volumeInfo.subtitle || ''}</h4>
      <div className={styles.details}>
        <div className={styles.left}>
          <img className={styles.coverImage} src={imageLink} />
        </div>
        <div className={styles.right}>
          <div dangerouslySetInnerHTML={{__html: sanitizedDescription}} />
        </div>
      </div>
    </section>
  }
}
