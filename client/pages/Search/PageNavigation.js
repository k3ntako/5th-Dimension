import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";

import styles from './index.css'

class PageNavigation extends Component {

  constructor(props){
    super(props);

    this.state = {
    };
  }

  nextPage = () => {
    const parsed = qs.parse(this.props.location.search.slice(1));

    this.props.history.push(`/search?q=${parsed.q}&p=${Number(parsed.p) + 1}`)
  }

  prevPage = () => {
    const parsed = qs.parse(this.props.location.search.slice(1));
    const newCurrentPage = parsed.p > 0 ? parsed.p - 1 : 0;
    this.props.history.push(`/search?q=${parsed.q}&p=${newCurrentPage}`)
  }


  render(){
    if( !this.props.bookSearch.totalItems ){
      return null;
    }

    return <div className={styles.pageNavigation}>
      { this.props.bookSearch.currentPage > 0 && <button className={`${styles.button} ${styles.prev}`} onClick={this.prevPage}>
        <IoMdArrowRoundBack size={"1.7rem"} />
        <span>Back</span>
      </button> }
      <button className={`${styles.button} ${styles.next}`} onClick={this.nextPage}>
        <span>Next</span>
        <IoMdArrowRoundForward size={"1.7rem"} />
      </button>
    </div>
  }

}

export default withRouter(PageNavigation);
