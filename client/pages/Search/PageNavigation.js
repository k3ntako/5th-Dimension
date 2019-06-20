import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import GoogleIcon from './../../components/GoogleIcon';

import styles from './PageNavigation.css';

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
    if( !this.props.totalItems ){
      return null;
    }

    let prevButton;

    if( this.props.currentPage > 0 ){
      prevButton = <button className={`${styles.button} ${styles.prev}`} onClick={this.prevPage}>
        <IoMdArrowRoundBack size={"1.4rem"} />
        <span>Back</span>
      </button>;
    }

    return <div className={styles.pageNavigation}>
      <div>{ prevButton }</div>
      <GoogleIcon className={styles.google}/>
      <div>
        <button className={`${styles.button} ${styles.next}`} onClick={this.nextPage}>
          <span>Next</span>
          <IoMdArrowRoundForward size={"1.4rem"} />
        </button>
      </div>
    </div>
  }

}

export default withRouter(PageNavigation);

// get lastPage(){
//   return Math.ceil(this._totalItems / MAX_RESULTS);
// }
//
// get noResults(){
//   return this._totalItems < 1 && !!Object.keys(this._results).length;
// }
