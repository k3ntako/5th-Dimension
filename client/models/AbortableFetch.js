class AbortableFetch {
  constructor(){
    try{
      this._controller = new AbortController();
      this._signal = this._controller.signal;
    }catch(err){
      console.log("AbortController not found");
      this._controller = null;
      this._signal = null;
    }
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
      this._isFetching = false;
      this._fetchSucessful = false;
    }
  }

  async getCacheOrFetch(url, cacheKey, expires){
    try{
      this._isFetching = true;

      const cachedContent = this.getCache(cacheKey);

      if( cachedContent && cachedContent.cached && cachedContent.cached.expires > Date.now()){
        this._response = cachedContent;
        this._fetchSucessful = true;
        this._isFetching = false;
      }else{

        const FIVE_MINS = Date.now() + 1000 * 60 * 5;
        for( let key in localStorage ){
          if( key.slice(0,6) !== 'aFetch' ){
            continue;
          }
          const content = JSON.parse(localStorage.getItem(key));
          const expires = content && content.cached && content.cached.expires;
          if( typeof expires === 'number' && expires < FIVE_MINS){
            localStorage.removeItem(key);
          }
        }

        await this.aFetch( url );

        if( this._fetchSucessful ){
          const jsonToCache = Object.assign({
            cached: {
              expires: expires || Date.now() + 1000 * 60 * 60 * 24
            }
          }, this._response);
          this.setCache(cacheKey, jsonToCache);
        }
      }
    }catch( err ){
      console.error(err);
    }
  }

  getCache(cacheKey){
    if( cacheKey ){
      const content = localStorage.getItem("aFetch" + cacheKey);
      return JSON.parse(content);
    }
    return null;
  }

  setCache(cacheKey, json){
    if( cacheKey ){
      localStorage.setItem("aFetch" + cacheKey, JSON.stringify(json));
      return true;
    }
    return false;
  }


  abort(){
    if( !this._controller && this._isFetching ){
      console.log("No AbortController, could not abort fetch.");
    }else if( this._isFetching ){
      this._controller.abort();
    }
  }
}

export default AbortableFetch;
