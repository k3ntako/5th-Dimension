import React, {Component} from 'react';
import Results from './Results';

import styles from './index.css';

const NYT_API_KEY = process.env.NYT_API;
const NYT_LINK = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${NYT_API_KEY}`;

const GOOGLE_API_KEY = "&key=" + process.env.GOOGLE_BOOKS_API_KEY;
const googleByISBN = (isbn) => `https://www.googleapis.com/books/v1/volumes?maxResults=1&q=ISBN:${isbn}${GOOGLE_API_KEY}`;


export default class Recommendations extends Component {

  constructor(props){
    super(props);

    this.state = {
      bestSellers: []
    };
  }

  async componentDidMount(){
    const responseJSON = await fetch(NYT_LINK).then(response => response.json());
    const isbns = responseJSON.results.books.map(book => book.isbns[0].isbn13).slice(0,12);

    const promises = isbns.map(async (isbn) => {
      return await fetch(googleByISBN(isbn)).then(response => response.json());
    });
    const resolvedPromises = await Promise.all(promises);
    const books = resolvedPromises.reduce((allBooks, book) => allBooks.concat(book.items), [])

    this.setState({
      bestSellers: books
    })
  }


  render(){
    if( !this.state.bestSellers || !this.state.bestSellers.length ){
      return null;
    }

    return <section className="page">
      <h3>New York Times Best Sellers: Fiction</h3>
      <Results books={this.state.bestSellers} />
    </section>
  }
}
