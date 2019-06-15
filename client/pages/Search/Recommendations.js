import React, {Component} from 'react';
import Results from './Results';

import styles from './index.css';

const NYT_API_KEY = "75CdDT9ccCYUBlFNTOLtYE1AwAMpdEFV";
console.log(NYT_API_KEY);
const NYT_LINK = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${NYT_API_KEY}`;

const GOOGLE_API_KEY = "&key=" + "AIzaSyCiP-gK-4paqp4nt-E8xWZFjTST-2o8E8w";
const googleByISBN = (isbn) => `https://www.googleapis.com/books/v1/volumes?maxResults=1&q=ISBN:${isbn}${GOOGLE_API_KEY}`;


export default class Recommendations extends Component {

  constructor(props){
    super(props);

    this.state = {
      bestSellers: []
    };
  }

  async componentDidMount(){
    try{
      const responseJSON = await fetch(NYT_LINK).then(response => response.json());
      const isbns = responseJSON.results.books.map(book => book.isbns[0].isbn13).slice(0,12);

      const promises = await isbns.map(async (isbn) => {
        const response = await fetch(googleByISBN(isbn));

        if( response.ok ){
          return await response.json();
        }else{
          let error = await response.json();
          console.error(error.error);
          return null;
        }
      });

      const resolvedPromises = await Promise.all(promises);

      const books = resolvedPromises.reduce((allBooks, book) => {
        if( book ){
          return allBooks.concat(book.items);
        }else{
          return allBooks;
        }
      }, [])

      this.setState({
        bestSellers: books
      })
    }catch( err ){
      console.log(err);
    }
  }


  render(){
    if( !this.state.bestSellers || !this.state.bestSellers.length ){
      return null;
    }

    return <div>
      <Results books={this.state.bestSellers} title="New York Times Best Sellers: Fiction" />
    </div>
  }
}
