import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { IoMdBook } from "react-icons/io";

import { parseQuery } from '../../utilities/SearchHelper';
import Results from './Results';
import PageNavigation from './PageNavigation';
import Recommendations from './Recommendations';
import Searcher from '../../models/Searcher';

const options = {
  intitle: "title",
  inauthor: "author",
  inpublisher: "publisher",
  subject: "category",
  isbn: "ISBN",
}

class SearchPage extends Component {

  constructor(props){
    super(props);

    const parsed = parseQuery(props.location.search.slice(1));

    this.state = {
      Searcher: new Searcher(parsed.q, parsed.p, this.forceUpdate.bind(this)),
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    try{
      const parsed = parseQuery(this.props.location.search.slice(1));
      const oldParsed = parseQuery(prevProps.location.search.slice(1));

      if( oldParsed.q === parsed.q ){
        //nothing has changed
        return;
      }

      this.state.Searcher.onSearchChanged( parsed.q, parsed.p )

    }catch( err ){
      console.error(err);
    }
  }

  componentWillUnmount(){
    this.state.Searcher.abortAll;
  }

  render(){
    const searchString  = this.state.Searcher.searchString;
    const currentPage  = this.state.Searcher.currentPage;
    const results  = this.state.Searcher.results;
    const totalItems  = this.state.Searcher.totalItems;

    // Homepage (user hasn't searched yet)
    if( !searchString ){
      return <section className="page">
        <Recommendations />
      </section>
    }

    let books, title, noResults = false;
    if( results && results[currentPage] ){
      let query = searchString;
      for( let type in options ){
        const regex = new RegExp(`${type}:`, "g");
        query = query.replace(regex, options[type] + ": ");
      }
      title = `Search for ${query}`;

      books = results[currentPage].all;
      noResults = results[currentPage].noResults;
    }

    return <section className="page">
      <Results books={books} title={title} noResults={noResults} />
      <PageNavigation
        totalItems={totalItems}
        currentPage={currentPage}
        currentPageBookCount={books && books.length}
        onPageChange={this.state.Searcher.onPageChange} />
    </section>
  }
}

SearchPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
}

export default withRouter(SearchPage);
