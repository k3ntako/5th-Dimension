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
      // goToPage: 1,
    };
  }

  nextPage = () => {
    // this.props.bookSearch.goToNextPage();
    const parsed = qs.parse(this.props.location.search.slice(1));

    this.props.history.push(`/search?q=${parsed.q}&p=${Number(parsed.p) + 1}`)
  }

  // goToPageOnChange = (event) => {
  //   let numberStr = event.target.value;
  //   numberStr = numberStr.replace( "\D", "" );
  //   const number = Number(numberStr);
  //
  //   if( numberStr === "" ){
  //     return this.setState({ goToPage: "" })
  //   }else if( number && number > 0 && number <= this.props.bookSearch.lastPage ){
  //     this.setState({ goToPage: number});
  //   }
  // }

  prevPage = () => {
    // this.props.bookSearch.goToPrevPage();
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


// totalItems is not consistent/reliable.
// <p>Results: {this.props.bookSearch.totalItems} Books ({this.props.bookSearch.lastPage} Pages)</p>
//<input
  // value={this.state.goToPage}
  // onChange={this.goToPageOnChange}
  // type="number" min="1" max={this.props.bookSearch.lastPage}
  // onKeyPress={this.listenForEnter} />
