const GOOGLE_BOOKS_URL_BASE = "https://www.googleapis.com/books/v1/";
const GOOGLE_API_KEY = "&key=" + process.env.GOOGLE_BOOKS_API_KEY;
const MAX_RESULTS = 12;

class BookSearch {

  constructor(props){
    this._results = {};
    this._searchString = "";
    this._totalItems = 0;
    this._currentPage = 0;
    this._isFetching = false;
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

  search = async ( searchString, page = 0 ) => {
    try{
      this._results = {};

      if( !searchString ){
        console.log(searchString)
        return;
      }

      const searchStringArr = searchString.split(' ');
      this._searchString = searchStringArr.join("+");

      this._totalItems = 0;

      this._currentPage = Number(page);

      await this.fetchPage( this._currentPage );
      await this.fetchPage( this._currentPage + 1 );
    }catch( err ){
      console.log(err);
    }
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
    try{
      if( !this.alreadyFetched(pageNum) ){
        const url = GOOGLE_BOOKS_URL_BASE + `volumes?maxResults=${MAX_RESULTS}&startIndex=${pageNum * MAX_RESULTS}&q=${this._searchString}` + GOOGLE_API_KEY;

        await fetch(url).then(response => response.json()).then(books => {
          if( books && books.items && books.items.length ){
            this._totalItems = books.totalItems;
            this._results[pageNum] =  books.items;
          }
        });
      }

      this.updateComponent();
    }catch( err ){
      console.log(err);
    }
  }

  onPageChange( pageNum ){
    this._currentPage = Number(pageNum);

    if( !this._results[this._currentPage] ){
      this.fetchPage(this._currentPage);
    }else if(!this._results[this._currentPage + 1]){
      this.fetchPage(this._currentPage + 1);
    }else{
      this.updateComponent();
    }
  }

  updateComponent(){
    // This function is set by the React component.
    console.log("Nothing here");
  }

}

export default BookSearch;
