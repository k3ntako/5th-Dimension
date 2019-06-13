import React, {Component} from 'react';
import BookSearch from '../../models/BookSearch';
import Results from './Results';

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      search: "",
      bookSearch: new BookSearch,
      goToPage: 1,
      fetching: true,
    };

    this.state.bookSearch.updateComponent = () => this.forceUpdate();
  }

  onChange = (event) => {
    this.setState({ search: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.state.bookSearch.search(this.state.search).then(() => {
      this.state.bookSearch.fetchNextPage();
      this.forceUpdate();
    });
  }

  nextPage = () => {
    this.state.bookSearch.getNextPage();
    this.forceUpdate()
  }

  goToPageOnChange = (event) => {
    let numberStr = event.target.value;
    numberStr = numberStr.replace( "\D", "" );
    const number = Number(numberStr);

    if( numberStr === "" ){
      return this.setState({ goToPage: "" })
    }else if( number && number > 0 && number <= Math.ceil( this.state.bookSearch.totalItems / 10 )){
      this.setState({ goToPage: number});
    }
  }

  prevPage = () => {
    this.state.bookSearch.getPrevPage();
    this.forceUpdate()
  }

  render(){
    const bookSearch = this.state.bookSearch;
    const pageCount = Math.ceil(this.state.bookSearch.totalItems / 10);

    return <div>
      <h1>Home Page</h1>
      <form onSubmit={this.onSubmit}>
        <input value={this.state.search} onChange={this.onChange} />
        <button>Search</button>
      </form>
      <Results books={bookSearch.results[`${bookSearch.currentPage}`]} />
      <div>
        <p>Results: {bookSearch.totalItems} Books ({pageCount} Pages)</p>
        <button onClick={this.prevPage}>Prev</button>
        <input
          value={this.state.goToPage}
          onChange={this.goToPageOnChange}
          type="number" min="1" max={pageCount} />
        <button onClick={this.nextPage}>Next</button>
      </div>
    </div>
  }
}
