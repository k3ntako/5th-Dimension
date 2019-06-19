import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { IoMdBook } from "react-icons/io";

import BookSearch from '../../models/BookSearch';
import Results from './Results';
import Recommendations from './Recommendations';
import PageNavigation from './PageNavigation';

import styles from './index.css'

const options = {
  intitle: "title",
  inauthor: "author",
  inpublisher: "publisher",
  subject: "category",
  isbn: "ISBN",
}

class Search extends Component {

  constructor(props){
    super(props);

    const parsed = qs.parse(props.location.search.slice(1));

    this.state = {
      search: parsed || {},
      bookSearch: new BookSearch,
    };

    this.state.bookSearch.updateComponent = () => this.forceUpdate();
  }

  componentDidMount(){
    if( this.state.search.q ){
      this.state.bookSearch.search(this.state.search.q, this.state.search.p || 0);
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot){
    try{
      const parsed = qs.parse(this.props.location.search.slice(1));

      if( parsed.q && parsed.q !== prevState.search.q ){
        let newBookSearch = new BookSearch;
        newBookSearch.updateComponent = () => this.forceUpdate();

        await this.setState({ search: parsed, bookSearch: newBookSearch });
        this.state.bookSearch.search(parsed.q, parsed.p);

      }else if( parsed.p !== prevState.search.p ){
        this.setState({ search: parsed });
        this.state.bookSearch.onPageChange( parsed.p );
      }else if( !parsed.q && this.state.bookSearch.totalItems ){
        this.setState({ bookSearch: new BookSearch });
      }
    }catch( err ){
      console.log(err);
    }
  }

  componentWillUnmount(){
    this.state.bookSearch.abort();
  }

  render(){
    const bookSearch = this.state.bookSearch;

    let results, title;
    if( this.state.search.q && bookSearch.results ){
      let query = this.state.search.q;
      for( let type in options ){
        const regex = new RegExp(`${type}:`, "g");
        query = query.replace(regex, options[type] + ": ");
      }

      title = `Search for ${query}`;
      let bookFetches = bookSearch.results[`${bookSearch.currentPage}`];
      let books = bookFetches && bookSearch.results[`${bookSearch.currentPage}`].all;
      results = <Results books={books} title={title} />
    }else{
      results = <>
        <h1 className={`websiteName ${styles.title}`}>5th Dimension</h1>
        <h3 className={`websiteName ${styles.subtitle}`}>Book Search</h3>
        <Recommendations />
      </>
    }

    return <section className="page">
      { results }
      <PageNavigation bookSearch={bookSearch} />
    </section>
  }
}

export default withRouter(Search);
