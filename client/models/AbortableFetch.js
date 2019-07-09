class AbortableFetch {
  constructor(){
    try{
      this._controller = new AbortController();
      this._signal = this._controller.signal;
    }catch(err){
      console.warn("AbortController not found");
      this._controller = null;
      this._signal = null;
    }
    this._response = null;
    this._isFetching = false;
    this._fetchSucessful = null;
    this._didAbort = false;
  }

  get response(){
    return this._response;
  }

  get isFetching(){
    return this._isFetching;
  }

  get fetchSucessful(){
    return this._fetchSucessful;
  }

  get didAbort(){
    return this._didAbort;
  }

  get noResults(){
    const fetchFailed = this._fetchSucessful === false || this._didAbort;
    return fetchFailed || (!this._isFetching && this._response && !this._response.totalItems);
  }

  async aFetch( url ){
    try{
      this._isFetching = true;

      const init = this._signal ? { signal: this._signal } : {};
      const response = await fetch( url, init );

      if( response.ok ){
        const json = await response.json();
        this._response = json;
        this._fetchSucessful = true;
      }else{
        this._fetchSucessful = false;
      }

      this._isFetching = false;
    }catch( err ){
      console.error(err);
      this._isFetching = false;
      this._fetchSucessful = false;
    }
  }

  abort(){
    this._didAbort = true;
    this._isFetching = false;
    this._fetchSucessful = false;
    if( !this._controller && this._isFetching ){
      console.warn("No AbortController, could not abort fetch.");
    }else if( this._isFetching ){
      this._controller.abort();
    }
  }
}

export default AbortableFetch;
