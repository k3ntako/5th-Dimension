import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import GoogleIcon from './../../components/GoogleIcon';

import styles from './PageNavigation.css';

const MAX_RESULTS = 12;

class PageNavigation extends Component {

  constructor(props){
    super(props);
  }

  nextPage = () => {
    const parsed = this.parseQuery(this.props.location.search.slice(1));

    this.props.history.push(`/search?q=${parsed.q}&p=${Number(parsed.p) + 1}`);
    window.scroll(0,0)
  }

  prevPage = () => {
    const parsed = this.parseQuery(this.props.location.search.slice(1));
    const newCurrentPage = parsed.p > 0 ? parsed.p - 1 : 0;
    this.props.history.push(`/search?q=${parsed.q}&p=${newCurrentPage}`);
    window.scroll(0,0)
  }

  parseQuery( toParse ){
    let parsed = qs.parse(toParse);
    parsed.p = Number(parsed.p) || 0;
    return parsed;
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

    const parsed = this.parseQuery(this.props.location.search.slice(1));
    if( Math.ceil(this.props.totalItems / MAX_RESULTS) > parsed.p && currentPageBookCount === 12 ){
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

export default withRouter(PageNavigation);
