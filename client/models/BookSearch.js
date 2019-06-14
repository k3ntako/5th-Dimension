const GOOGLE_BOOKS_URL_BASE = "https://www.googleapis.com/books/v1/";
const API_KEY_URL = "&key=AIzaSyCWI8uVnnhCHXsZxT_CyKarpPYYr6b-a7s";
const MAX_RESULTS = 10; //Google's default


class BookSearch {

  constructor(props){
    this._results = {};
    this._searchString = "";
    this._totalItems = 0;
    this._currentPage = 0;
    this.fetchNextPage = this.fetchNextPage.bind(this);
  }

  get results(){
    return this._results;
  }

  get currentPage(){
    return this._currentPage;
  }

  get totalItems(){
    return this._totalItems;
  }

  get lastPage(){
    return Math.ceil(this._totalItems / MAX_RESULTS);
  }

  search = async ( searchString ) => {
    this._results = {};
    const searchStringArr = searchString.split(' ');
    this._searchString = searchStringArr.join("+");

    await this.fetchPage( 0 );
    await this.fetchPage( 1 );
  }

  alreadyFetched( pageNum ){
    return !!this._results[pageNum];
  }

  fetchNextPage(){
    if( !this.alreadyFetched(this._currentPage + 1) && this._currentPage + 1 <= this.lastPage ){
      this.fetchPage( this._currentPage + 1 );
    }
  }

  fetchPage = async( pageNum ) => {
    if( !this.alreadyFetched(pageNum) ){
      const url = GOOGLE_BOOKS_URL_BASE + `volumes?startIndex=${pageNum * MAX_RESULTS}&q=${this._searchString}` + API_KEY_URL;

      await fetch(url).then(response => response.json()).then(books => {
        if( books && books.items && books.items.length ){
          this._totalItems = books.totalItems;
          this._results[pageNum] =  books.items;
        }
      });
    }

    this.updateComponent();
  }

  goToNextPage(){
    this._currentPage++;

    if( !this._results[this._currentPage] ){
      this.fetchPage(this._currentPage);
    }else if(!this._results[this._currentPage + 1]){
      this.fetchPage(this._currentPage + 1);
    }
  }

  goToPrevPage(){
    if( this._currentPage > 0 ){
      this._currentPage--;
    }
  }

  goToPage( pageNum ){
    this._currentPage = pageNum;
    this.fetchPage( pageNum );
  }

  updateComponent(){
    console.log("Nothing here");
  }

}

export default BookSearch;
