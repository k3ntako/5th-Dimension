import AbortableFetchGoogle from './AbortableFetchGoogle';
import { googleBooksURL, bookFields, MAX_RESULTS } from '../utilities/GoogleBooksURL';
const FIELDS = bookFields({ isSearch: true, imageType: "thumbnail" });

export default class Search {
  constructor(searchString, page = 0, searchFinishCallback){
    this._searchString = searchString;
    this._currentPage = page;
    this._results = {};
    this._totalItems = null;
    this._fetchingCurrentPage = true;
    this._searchFinishCallback = searchFinishCallback || (() => {});

    this.setUpFetch(this._currentPage || 0);
  }

  get searchString(){
    return this._searchString;
  }

  get currentPage(){
    return this._currentPage;
  }

  get results(){
    return this._results;
  }

  get totalItems(){
    return this._totalItems;
  }

  alreadyFetched( pageNum ){
    return !!this._results[pageNum];
  }

  onSearchChanged( searchString, currentPage ){
    this._searchString = searchString || "";
    this._currentPage = currentPage || 0;
    this._results = {};
    this._totalItems = null;

    if( searchString ){
      this.setUpFetch(currentPage);
    }else{
      this._searchFinishCallback();
    }
  }

  setUpFetch( pageNum = 0 ){
    if( this._searchString ){
      const newFetch = new AbortableFetchGoogle;
      const results = Object.assign({}, this._results, { [pageNum]: newFetch });

      this._results = results;
      this._fetchingCurrentPage = pageNum === this._currentPage;

      this.fetchSearch(pageNum);
    }
  }

  async fetchSearch(pageNum){
    try{
      const currentPage = this._currentPage;
      const results = this._results;
      const searchString = this._searchString;

      const searchQuery = searchString.replace(/\s+/g, "+"); // replaces whitespace with "+"
      const url = googleBooksURL({
        search: `startIndex=${pageNum * MAX_RESULTS}&q=${searchQuery}&${FIELDS}`
      });

      const googleFetch = results[pageNum];
      await googleFetch.aFetch( url );

      if( googleFetch.didAbort ){
        return;
      }

      this._totalItems = googleFetch.fetchSucessful ? googleFetch.response.totalItems : 0;
      this._fetchingCurrentPage = false;

      if( results[currentPage].response.totalItems && !results[currentPage + 1] ){
        this.setUpFetch( currentPage + 1 );
      }

      this._searchFinishCallback();
    }catch( err ){
      console.error(err);
    }
  }

  onPageChange = ( pageNum ) => {
    this._currentPage = pageNum;

    if( !this.alreadyFetched(pageNum) ){
      this.setUpFetch( pageNum );
    }else if(!this.alreadyFetched(pageNum + 1)){
      this.setUpFetch( pageNum + 1 );
    }
  }

  abortAll(){
    for (let pageNum in this._results){
      this._results[pageNum].abort();
    }
  }
}
