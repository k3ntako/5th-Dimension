import React, {Component} from 'react';
import GoogleIcon from './../../components/GoogleIcon';
import Results from './Results';
import AbortableFetch from './../../models/AbortableFetch';
import AbortableFetchGoogle from './../../models/AbortableFetchGoogle';

import styles from './Recommendations.css';

const NYT_API_KEY = "75CdDT9ccCYUBlFNTOLtYE1AwAMpdEFV";
const NYT_LINK = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${NYT_API_KEY}`;

const fields = "&fields=items(id,volumeInfo(authors,imageLinks(thumbnail),publisher,title,subtitle))";
const GOOGLE_API_KEY = "&key=" + "AIzaSyCiP-gK-4paqp4nt-E8xWZFjTST-2o8E8w";
const googleByISBN = (isbn) => `https://www.googleapis.com/books/v1/volumes?maxResults=1&q=ISBN:${isbn}${fields}${GOOGLE_API_KEY}`;

const createFourAM = ( daysFromNow ) => {
  let fourAM = new Date();
  fourAM.setHours(4);
  fourAM.setMinutes(0);
  fourAM.setDate(fourAM.getDate() + daysFromNow * 24 * 60 * 60 * 1000);
  return fourAM;
}

export default class Recommendations extends Component {

  constructor(props){
    super(props);

    this.state = {
      bestSellers: []
    };

    this.fetches = [];
  }

  async componentDidMount(){
    try{
      let fourAMTomorrow = createFourAM(1);
      let fourAMNextWeek = createFourAM(6);

      const nytFetch = new AbortableFetch();
      this.fetches.push( nytFetch );
      await nytFetch.getCacheOrFetch(NYT_LINK, "combined-print-and-e-book-fiction", fourAMTomorrow);

      if( !nytFetch.fetchSucessful ){
        return null;
      }

      const isbns = nytFetch.response.results.books.map(book => book.isbns[0].isbn13).slice(0,6);

      const fetchPromises = isbns.map(async (isbn) => {
        try{
          const newFetch = new AbortableFetchGoogle();
          this.fetches.push( newFetch );
          await newFetch.getCacheOrFetch(googleByISBN(isbn), 'googleISBN' + isbn, fourAMNextWeek);
          return newFetch;
        }catch( err ){
          console.error(err);
        }
      });

      let fetches = await Promise.all(fetchPromises);

      const aborted = fetches.some(fetch => fetch.didAbort);
      const books = this.state.bestSellers.map(book => book.first);
      if( !aborted ){
        const books = fetches.map(fetch => fetch.first);
        this.setState({
          bestSellers: books
        });
      }
    }catch( err ){
      console.error(err);
    }
  }

  componentWillUnmount(){
    for (let idx in this.fetches){
      this.fetches[idx].abort();
    }
  }

  render(){
    const bestSellers = this.state.bestSellers;
    if( !bestSellers || !bestSellers.length ){
      return null;
    }

    return <>
      <h1 className={`websiteName ${styles.title}`}>5th Dimension</h1>
      <h3 className={`websiteName ${styles.subtitle}`}>Book Search</h3>
      <div>
        <Results books={bestSellers} title="New York Times Best Sellers: Fiction" />
        <GoogleIcon className={styles.google}/>
      </div>
    </>
  }
}
