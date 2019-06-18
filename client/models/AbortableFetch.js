class AbortableFetch {
  constructor(){
    this._controller = new AbortController();
    this._signal = this._controller.signal;
    this._response = null;
    this._isFetching = false;
    this._fetchSucessful = null;
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

  async fetch( url ){
    try{
      this._isFetching = true;

      const response = await fetch( url, { signal: this._signal } );

      if( response.ok ){
        const json = await response.json();
        this._response = json;
        this._fetchSucessful = true;
      }else{
        this._fetchSucessful = false;
      }

      this._isFetching = false;
    }catch( err ){
      this._isFetching = false;
      this._fetchSucessful = false;
    }
  }

  abort(){
    if( this._isFetching ){
      this._controller.abort();
    }
  }
}

export default AbortableFetch;
