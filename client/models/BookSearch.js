import AbortableFetchGoogle from './AbortableFetchGoogle';

const FIELDS = "&fields=items(id,volumeInfo(authors,imageLinks(thumbnail),publisher,title))";
const MAX_RESULTS = 12;
const GOOGLE_API_KEY = "&key=" + "AIzaSyCiP-gK-4paqp4nt-E8xWZFjTST-2o8E8w";
const GOOGLE_BOOKS_URL_BASE = `https://www.googleapis.com/books/v1/volumes?maxResults=${MAX_RESULTS}&${FIELDS}`;

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

  search = async ( searchString, page = 0 ) => {
    try{
      this._results = {};

      if( !searchString ){
        console.log("Invalid search: ", searchString);
        return;
      }

      this._searchString = searchString.replace(/\s+/g, "+");

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
      if( typeof pageNum === 'number' && !Number.isNaN(pageNum) && !this.alreadyFetched(pageNum) ){
        const url = GOOGLE_BOOKS_URL_BASE + `&startIndex=${pageNum * MAX_RESULTS}&q=${this._searchString}` + GOOGLE_API_KEY;

        const newFetch = new AbortableFetchGoogle;
        this._results[pageNum] = newFetch;
        await newFetch.aFetch( url );
        if( newFetch._fetchSucessful ){
          this._totalItems = newFetch.response.totalItems;
          this.updateComponent();
        }
      }
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

  abort(){
    for (let idx in this._results){
      this._results[idx].abort();
    }
  }

}

export default BookSearch;
