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

    this.state = {
    };
  }

  nextPage = () => {
    const parsed = this.parseQuery(this.props.location.search.slice(1));

    this.props.history.push(`/search?q=${parsed.q}&p=${Number(parsed.p) + 1}`)
  }

  prevPage = () => {
    const parsed = this.parseQuery(this.props.location.search.slice(1));
    const newCurrentPage = parsed.p > 0 ? parsed.p - 1 : 0;
    this.props.history.push(`/search?q=${parsed.q}&p=${newCurrentPage}`)
  }

  parseQuery( toParse ){
    let parsed = qs.parse(toParse);
    parsed.p = Number(parsed.p) || 0;
    return parsed;
  }

  render(){
    if( !this.props.totalItems || this.props.noBooks ){
      return null;
    }


    let prevButton, nextButton;

    if( this.props.currentPage > 0 ){
      prevButton = <button className={`${styles.button} ${styles.prev}`} onClick={this.prevPage}>
        <IoMdArrowRoundBack size={"1.4rem"} />
        <span>Back</span>
      </button>;
    }

    const parsed = this.parseQuery(this.props.location.search.slice(1));
    if( Math.ceil(this.props.totalItems / MAX_RESULTS) > parsed.p ){
      nextButton = <button className={`${styles.button} ${styles.next}`} onClick={this.nextPage}>
        <span>Next</span>
        <IoMdArrowRoundForward size={"1.4rem"} />
      </button>
    }

    return <div className={styles.pageNavigation}>
      <div>{ prevButton }</div>
      <GoogleIcon className={styles.google}/>
      <div>
        <div>{ nextButton }</div>
      </div>
    </div>
  }

}

export default withRouter(PageNavigation);
