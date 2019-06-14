import React, {Component} from 'react';
import BookSearch from '../../models/BookSearch';
import Results from './Results';
import { IoMdBook } from "react-icons/io";
import styles from './index.css';


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

  componentDidMount(){
    // TODO: remove
    this.state.bookSearch.search("Javascript");
  }

  onChange = (event) => {
    this.setState({ search: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.state.bookSearch.search(this.state.search);
  }

  nextPage = () => {
    this.state.bookSearch.goToNextPage();
    this.forceUpdate()
  }

  goToPageOnChange = (event) => {
    let numberStr = event.target.value;
    numberStr = numberStr.replace( "\D", "" );
    const number = Number(numberStr);

    if( numberStr === "" ){
      return this.setState({ goToPage: "" })
    }else if( number && number > 0 && number <= this.state.bookSearch.lastPage ){
      this.setState({ goToPage: number});
    }
  }

  prevPage = () => {
    this.state.bookSearch.goToPrevPage();
    this.forceUpdate()
  }

  goToPage = () => {
    const { bookSearch, goToPage } = this.state;
    bookSearch.goToPage(goToPage - 1);
  }

  listenForEnter = (event) => {
    if(event.key == 'Enter'){
      this.goToPage();
    }
  }

  render(){
    const bookSearch = this.state.bookSearch;

    return <section className="page">
      <div className={styles.search}>
        <h1 className="websiteName">Book Search</h1>
        <form className={styles.searchForm} onSubmit={this.onSubmit}>
          <input className={styles.searchBar} value={this.state.search} onChange={this.onChange} />
          <button className={styles.searchButton}><IoMdBook size={"1.7rem"} /></button>
        </form>
      </div>
      <Results books={bookSearch.results[`${bookSearch.currentPage}`]} />
      <div>
        <p>Results: {bookSearch.totalItems} Books ({bookSearch.lastPage} Pages)</p>
        <button onClick={this.prevPage}>Prev</button>
        <input
          value={this.state.goToPage}
          onChange={this.goToPageOnChange}
          type="number" min="1" max={bookSearch.lastPage}
          onKeyPress={this.listenForEnter}/>
        <button onClick={this.nextPage}>Next</button>
      </div>
    </section>
  }
}
