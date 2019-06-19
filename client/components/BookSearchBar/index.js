import React, { useState, useEffect } from 'react';
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


const BookSearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const [activeType, setActiveType] = useState("all");
  const textInput = React.createRef();

  // Acts as componentDidMount
  useEffect(() => {
    document.addEventListener("click", (event) => {
      const searchForm = document.getElementsByClassName(styles.searchForm)[0];

      if( !searchForm.contains(event.target) ){
        setHasFocus(false);
      }
    });
  }, []);

  const onSubmit = () => {
    setHasFocus(false);
     textInput.current.blur();

    let query = search.trim().replace(/\s+/g, "+");
    query = activeType === 'all' ? query : `${activeType}:${query}`;

    if( !query ){
      props.history.push('/search');
    }else{
      props.history.push(`/search?q=${query}&p=0`);
    }

  }

  const listenForEnter = (event) => {
    if(event.key == 'Enter'){
      onSubmit();
    }
  }

  const hasTextClassName = !!search.length ? styles.hasText : "";
  const hasFocusClassName = hasFocus ? styles.hasFocus : "";

  let buttons = [];
  for ( let type in options ){
    const activeClassName = type === activeType ? styles.activeButton : '';

    buttons.push(
      <button key={type} className={activeClassName} onClick={(event) => {
          event.preventDefault();
          setActiveType(type);
        }}>
        {options[type]}
      </button>
    );
  }

  return <div className={`${styles.searchForm} ${hasFocusClassName}`}>
    <input ref={textInput}
      className={`${styles.searchBar} ${hasTextClassName} ${hasFocusClassName}`}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onFocus={() => setHasFocus(true)}
      onKeyPress={listenForEnter} />
    <div className={`${styles.buttons} ${hasFocusClassName}`}>{ buttons }</div>
  </div>
}

export default withRouter(BookSearchBar);
