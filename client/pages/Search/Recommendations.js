import React, {Component} from 'react';
import GoogleIcon from './../../components/GoogleIcon';
import Results from './Results';
import AbortableFetch from './../../models/AbortableFetch';
import AbortableFetchGoogle from './../../models/AbortableFetchGoogle';

import styles from './Recommendations.css';

const NYT_API_KEY = "75CdDT9ccCYUBlFNTOLtYE1AwAMpdEFV";
const NYT_LINK = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${NYT_API_KEY}`;

const GOOGLE_API_KEY = "&key=" + "AIzaSyCiP-gK-4paqp4nt-E8xWZFjTST-2o8E8w";
const googleByISBN = (isbn) => `https://www.googleapis.com/books/v1/volumes?maxResults=1&q=ISBN:${isbn}${GOOGLE_API_KEY}`;


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
      const nytFetch = new AbortableFetch();
      this.fetches.push( nytFetch );
      await nytFetch.aFetch(NYT_LINK);

      if( !nytFetch.fetchSucessful ){
        return null;
      }

      const isbns = nytFetch.response.results.books.map(book => book.isbns[0].isbn13).slice(0,6);

      const fetchPromises = isbns.map(async (isbn) => {
        const newFetch = new AbortableFetchGoogle();
        this.fetches.push( newFetch );
        await newFetch.aFetch(googleByISBN(isbn));
        return newFetch;
      });

      let fetches = await Promise.all(fetchPromises);


      const aborted = fetches.some(fetch => !fetch.fetchSucessful);

      if( !aborted ){
        this.setState({
          bestSellers: fetches
        });
      }
    }catch( err ){
      console.log(err);
    }
  }

  componentWillUnmount(){
    for (let idx in this.fetches){
      this.fetches[idx].abort();
    }
  }


  render(){
    if( !this.state.bestSellers || !this.state.bestSellers.length ){
      return null;
    }

    const books = this.state.bestSellers.map(book => book.first);

    return <div>
      <Results books={books} title="New York Times Best Sellers: Fiction" />
      <GoogleIcon className={styles.google}/>
    </div>
  }
}
