import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MAX_RESULTS } from '../../utilities/GoogleBooksURL';
import { parseQuery } from '../../utilities/SearchHelper';
import GoogleIcon from './../../components/GoogleIcon';

import styles from './PageNavigation.css';


class PageNavigation extends Component {

  constructor(props){
    super(props);
  }

  nextPage = () => {
    const parsed = parseQuery(this.props.location.search.slice(1));
    const newCurrentPage = Number(parsed.p) + 1;

    this.props.onPageChange( newCurrentPage );
    this.props.history.push(`/search?q=${parsed.q}&p=${newCurrentPage}`);
    window.scroll(0,0); //scroll to top
  }

  prevPage = () => {
    const parsed = parseQuery(this.props.location.search.slice(1));
    const newCurrentPage = parsed.p > 0 ? parsed.p - 1 : 0;

    this.props.onPageChange( newCurrentPage );
    this.props.history.push(`/search?q=${parsed.q}&p=${newCurrentPage}`);
    window.scroll(0,0); //scroll to top
  }

  render(){
    const { totalItems, currentPageBookCount, currentPage } = this.props;

    if( !totalItems || !currentPageBookCount ){
      return null;
    }

    let prevButton, nextButton;

    if( currentPage > 0 ){
      prevButton = <button className={`${styles.button} ${styles.prev}`} onClick={this.prevPage}>
        <IoMdArrowRoundBack size={"1.4rem"} />
        <span>Back</span>
      </button>;
    }

    const parsed = parseQuery(this.props.location.search.slice(1));
    if( Math.ceil(this.props.totalItems / MAX_RESULTS) > parsed.p && currentPageBookCount === MAX_RESULTS ){
      nextButton = <button className={`${styles.button} ${styles.next}`} onClick={this.nextPage}>
        <span>Next</span>
        <IoMdArrowRoundForward size={"1.4rem"} />
      </button>
    }

    return <div className={styles.pageNavigation}>
      <div>{ prevButton }</div>
      <GoogleIcon className={styles.google}/>
      <div>{ nextButton }</div>
    </div>
  }

}

PageNavigation.propTypes = {
  totalItems: PropTypes.number,
  currentPageBookCount: PropTypes.number,
  currentPage: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
}

export default withRouter(PageNavigation);
