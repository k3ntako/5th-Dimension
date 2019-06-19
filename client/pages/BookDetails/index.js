import React, {Component} from 'react';
import styles from './index.css';
import DOMPurify from 'dompurify';

import AbortableFetchGoogle from '../../models/AbortableFetchGoogle';

const DOMPurifyOptions = {
  ALLOWED_TAGS: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'ul', 'ol', 'li',
  'b', 'i', 'u', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'sup', 'sub',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span', ],
}

export default class BookDetails extends Component {

  constructor(props){
    super(props);

    this.state = {
      bookFetch: null
    };

    this.fetch = null;
  }

  async componentDidMount(){
    const bookFetch = new AbortableFetchGoogle;
    this.fetch = bookFetch;
    const link = `https://www.googleapis.com/books/v1/volumes/${this.props.match.params.id}`;
    await bookFetch.aFetch( link );

    if( bookFetch.fetchSucessful ){
      this.setState({ bookFetch: bookFetch });
    }
  }

  componentWillUnmount(){
    this.fetch.abort();
  }

  render(){
    const { bookFetch } = this.state;

    if( !bookFetch ){
      return null;
    }

    const book = bookFetch.first;
    const { volumeInfo } = book;

    if (!volumeInfo) {
      return null
    }

    const sanitizedDescription = DOMPurify.sanitize(volumeInfo.description, DOMPurifyOptions);
    const imageLink = volumeInfo.imageLinks && volumeInfo.imageLinks.small;

    const identifiers = volumeInfo.industryIdentifiers.map(identifier => {
      return <div key={identifier.type + identifier.identifier}>
        <strong>{identifier.type.replace(/\_/g, " ")}</strong>: {identifier.identifier}
      </div>
    })

    let publishedDateHTML;
    if( volumeInfo.publishedDate && typeof volumeInfo.publishedDate === 'string' ){
      const dateSplit = volumeInfo.publishedDate.split("-")
      const publishedDate = new Date(Date.UTC(dateSplit[0], dateSplit[1], [2], 12));
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      publishedDateHTML = <div>
        <strong>Published</strong>: {publishedDate.toLocaleDateString('en-US', options)}
      </div>
    }

    const categoryTitle = volumeInfo.categories.length < 1 ? "Category" : "Categories";
    const categories = volumeInfo.categories.join(", ")


    return <section className="page">
      <h2 className={styles.title}>{volumeInfo.title}</h2>
      <h4 className={styles.subtitle}>{volumeInfo.subtitle || ''}</h4>
      <div className={styles.details}>
        <img className={styles.coverImage} src={imageLink} />
        <div className={styles.info}>
          <div><strong>Publisher</strong>: {volumeInfo.publisher}</div>
          { publishedDateHTML }
          <div><strong>Page Count</strong>: {volumeInfo.pageCount} pages</div>
          { identifiers }
          <div><strong>{categoryTitle}</strong>: {categories}</div>
          <div>
            <p>
              <a href={volumeInfo.previewLink}>More at Google Books</a>
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
