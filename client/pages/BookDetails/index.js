import React, {Component} from 'react';
import styles from './index.css';
import DOMPurify from 'dompurify';

import NoImage from '../../components/NoImage';
import AbortableFetchGoogle from '../../models/AbortableFetchGoogle';

const DOMPurifyOptions = {
  ALLOWED_TAGS: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'ul', 'ol', 'li',
  'b', 'i', 'u', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'sup', 'sub',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span', ],
}

const FIELDS = "fields=volumeInfo(authors,categories,description,industryIdentifiers," +
  "imageLinks(small),pageCount,previewLink,publishedDate,publisher,title,subtitle)";

export default class BookDetails extends Component {

  constructor(props){
    super(props);

    this.state = {
      bookFetch: null
    };

    this.fetch = null;
  }

  async componentDidMount(){
    try{
      const bookFetch = new AbortableFetchGoogle;
      this.fetch = bookFetch;
      const link = `https://www.googleapis.com/books/v1/volumes/${this.props.match.params.id}?${FIELDS}`;
      await bookFetch.aFetch( link );

      if( bookFetch.fetchSucessful ){
        this.setState({ bookFetch: bookFetch });
      }
    }catch( err ){
      console.error(err);
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
    const vInfo = book.volumeInfo;

    if (!vInfo) {
      return null
    }

    const sanitizedDescription = DOMPurify.sanitize(vInfo.description, DOMPurifyOptions);
    const imageLink = vInfo.imageLinks && vInfo.imageLinks.small;

    const identifiers = vInfo.industryIdentifiers && vInfo.industryIdentifiers.map(identifier => {
      return <div key={identifier.type + identifier.identifier}>
        <strong>{identifier.type.replace(/\_/g, " ")}</strong>: {identifier.identifier}
      </div>
    })

    let publishedDateHTML;
    if( vInfo.publishedDate && typeof vInfo.publishedDate === 'string' ){
      const dateSplit = vInfo.publishedDate.split("-")
      const publishedDate = new Date(Date.UTC(dateSplit[0], dateSplit[1], [2], 12));
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      publishedDateHTML = <div>
        <strong>Published</strong>: {publishedDate.toLocaleDateString('en-US', options)}
      </div>
    }

    let categoryTitle, categories, categoriesHTML;
    if( vInfo.categories ){
      categoryTitle = vInfo.categories.length < 2 ? "Category" : "Categories";
      categories = vInfo.categories.join(", ");
      categoriesHTML = <div><strong>{categoryTitle}</strong>: {categories}</div>;
    }

    const bookCover = imageLink ? <img className={styles.coverImage} src={imageLink} /> : <NoImage className={styles.coverImage} />;

    return <section className="page">
      <h2 className={styles.title}>{vInfo.title}</h2>
      <h4 className={styles.subtitle}>{vInfo.subtitle || ''}</h4>
      <div className={styles.details}>
        { bookCover }
        <div className={styles.info}>
          <div><strong>Publisher</strong>: {vInfo.publisher}</div>
          { publishedDateHTML }
          <div><strong>Page Count</strong>: {vInfo.pageCount} pages</div>
          { identifiers }
          { categoriesHTML }
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
