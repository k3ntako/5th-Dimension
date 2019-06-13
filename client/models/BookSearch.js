const GOOGLE_BOOKS_URL_BASE = "https://www.googleapis.com/books/v1/";
const API_KEY_URL = "&key=AIzaSyD_qqQDK2aXFXgKd2ztj8GfFzYio5YewZA";
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

  search( searchString ){
    this._results = {};
    const searchStringArr = searchString.split(' ');
    this._searchString = searchStringArr.join("+");

    return this.fetchPage( 0 );
  }

  fetchNextPage(){
    this.fetchPage( this._currentPage + 1 );
  }

  fetchPage( pageNum ){
    const url = GOOGLE_BOOKS_URL_BASE + `volumes?startIndex=${pageNum * 10}&q=${this._searchString}` + API_KEY_URL;

    return fetch(url).then(response => response.json()).then(books => {
      if( books && books.items && books.items.length ){
        this._totalItems = books.totalItems;
        this._results[pageNum] =  books.items;
      }

      return this.updateComponent();
    });
  }

  getNextPage(){
    this._currentPage++;

    if( !this._results[this._currentPage] ){
      this.fetchPage(this._currentPage);
    }else if(!this._results[this._currentPage + 1]){
      this.fetchPage(this._currentPage + 1);
    }
  }

  getPrevPage(){
    this._currentPage--;
  }

  getPage( pageNum ){
    this._currentPage = pageNum;
  }

  updateComponent(){
    console.log("Nothing here");
  }

}

export default BookSearch;
