import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { IoMdBook } from "react-icons/io";

import AbortableFetchGoogle from '../../models/AbortableFetchGoogle';
import { googleBooksURL, MAX_RESULTS } from '../../utilities/GoogleBooksURL';
import { parseQuery } from '../../utilities/SearchHelper';
import Results from './Results';
import PageNavigation from './PageNavigation';
import Recommendations from './Recommendations';

const FIELDS = "fields=totalItems,items(id,volumeInfo(authors,imageLinks(thumbnail),publisher,title,subtitle))";

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

    const parsed = parseQuery(props.location.search.slice(1));

    this.state = {
      searchString: parsed.q,
      currentPage: parsed.p,
      results: {},
      totalItems : null,
      fetchingCurrentPage: true,
    };
  }

  componentDidMount(){
    this.setUpFetch(this.state.currentPage || 0);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    try{
      const parsed = parseQuery(this.props.location.search.slice(1));
      const oldParsed = parseQuery(prevProps.location.search.slice(1));

      if( oldParsed.q === parsed.q ){
        //nothing has changed
        return;
      }

      // new search or back to homepage
      this.setState({
        searchString: parsed.q || "",
        results: {},
        totalItems : null,
        currentPage: parsed.p || 0,
      }, () => this.setUpFetch(parsed.p));

    }catch( err ){
      console.error(err);
    }
  }

  setUpFetch( pageNum = 0 ){
    if( this.state.searchString ){
      const newFetch = new AbortableFetchGoogle;
      const results = Object.assign({}, this.state.results, { [pageNum]: newFetch });
      this.setState({
        results,
        fetchingCurrentPage: pageNum === this.state.currentPage
      }, () => this.fetchSearch(pageNum));
    }
  }

  async fetchSearch(pageNum){
    try{
      const { currentPage, results, searchString } = this.state;

      const searchQuery = searchString.replace(/\s+/g, "+"); // replaces whitespace with "+"
      const url = googleBooksURL({
        search: `startIndex=${pageNum * MAX_RESULTS}&q=${searchQuery}&${FIELDS}`
      });

      const googleFetch = results[pageNum];
      await googleFetch.aFetch( url );

      if( googleFetch.didAbort ){
        return;
      }

      const totalItems = googleFetch.fetchSucessful ? googleFetch.response.totalItems : 0;
      this.setState({
        totalItems,
        fetchingCurrentPage: false
      });

      if( results[currentPage].response.totalItems && !results[currentPage + 1] ){
        this.setUpFetch( currentPage + 1 );
      }
    }catch( err ){
      console.error(err);
    }
  }

  alreadyFetched( pageNum ){
    return !!this.state.results[pageNum];
  }

  onPageChange = ( pageNum ) => {
    this.setState({
      currentPage: pageNum
    }, () => {
      if( !this.alreadyFetched(pageNum) ){
        this.setUpFetch( pageNum );
      }else if(!this.alreadyFetched(pageNum + 1)){
        this.setUpFetch( pageNum + 1 );
      }
    });
  }

  componentWillUnmount(){
    for (let pageNum in this.state.results){
      this.state.results[pageNum].abort();
    }
  }

  render(){
    const { currentPage, results, searchString, totalItems } = this.state;

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
      noResults = results[currentPage].noResults
    }

    return <section className="page">
      <Results books={books} title={title} noResults={noResults} />
      <PageNavigation
        totalItems={totalItems}
        currentPage={currentPage}
        currentPageBookCount={books && books.length}
        onPageChange={this.onPageChange} />
    </section>
  }
}

Search.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
}

export default withRouter(Search);
