import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IoMdBook } from "react-icons/io";
import styles from './index.css';

const options = {
  all: "All",
  intitle: "Title",
  inauthor: "Author",
  inpublisher: "Publisher",
  subject: "Category",
  isbn: "ISBN",
}

class BookSearchBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      search: "",
      hasFocus: false,
      activeType: "all"
    };
    this.textInput = React.createRef();
  }

  componentDidMount(){
    // Clicking outside of search bar will cause search bar to lose focus
    document.addEventListener("click", (event) => {
      const searchForm = document.getElementsByClassName(styles.searchForm)[0];

      if( !searchForm.contains(event.target) ){
        this.setState({ hasFocus: false });
      }
    });
  }

  onSubmit = () => {
    this.setState({ hasFocus: false });
    this.textInput.current.blur();

    const { activeType, search } = this.state;
    let query = search.trim().replace(/\s+/g, "+");
    query = activeType === 'all' ? query : `${activeType}:${query}`;

    if( !query ){
      this.props.history.push('/search');
    }else{
      this.props.history.push(`/search?q=${query}&p=0`);
    }

  }

  listenForEnter = (event) => {
    if(event.key == 'Enter'){
      this.onSubmit();
    }
  }

  onSearchChange = (event) => {
    const searchString = event.target.value;
    this.setState({ search: searchString });
  }

  onTypeChange(type){
    this.setState({ activeType: type },
      () => this.textInput.current.focus());
  }

  render(){
    const { activeType, search, hasFocus } = this.state;

    const hasTextClassName = !!search.length ? styles.hasText : "";
    const hasFocusClassName = hasFocus ? styles.hasFocus : "";

    let buttons = [];
    for ( let type in options ){
      const activeClassName = type === activeType ? styles.activeButton : '';

      buttons.push(
        <button key={type} className={activeClassName} onClick={() => this.onTypeChange(type)}>
          {options[type]}
        </button>
      );
    }

    return <div className={`${styles.searchForm} ${hasFocusClassName}`}>
      <input ref={this.textInput}
        className={`${styles.searchBar} ${hasTextClassName} ${hasFocusClassName}`}
        value={search}
        onChange={this.onSearchChange}
        onFocus={() => this.setState({ hasFocus: true})}
        onKeyPress={this.listenForEnter} />
      <div className={`${styles.buttons} ${hasFocusClassName}`}>{ buttons }</div>
    </div>
  }
}


export default withRouter(BookSearchBar);
