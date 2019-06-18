import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { IoMdBook } from "react-icons/io";

import BookSearch from '../../models/BookSearch';
import Results from './Results';
import Recommendations from './Recommendations';
import PageNavigation from './PageNavigation';


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
      title = `Results for: ${this.state.search.q}`
      let bookFetches = bookSearch.results[`${bookSearch.currentPage}`];
      let books = bookFetches && bookSearch.results[`${bookSearch.currentPage}`].all;
      results = <Results books={books} title={title} />
    }else{
      results = <Recommendations />
    }

    return <section className="page">
      { results }
      <PageNavigation bookSearch={bookSearch} />
    </section>
  }
}

export default withRouter(Search);
