import AbortableFetch from './AbortableFetch';

class AbortableFetchWithCaching extends AbortableFetch{
  constructor(){
    super();
  }

  async getCacheOrFetch(url, cacheKey, expires){
    try{
      this._isFetching = true;

      const cachedContent = this.getCache(cacheKey);

      if( cachedContent && cachedContent.cached && new Date(cachedContent.cached.expires) > Date.now()){
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
          if( typeof expires === 'number' && expires < FIVE_MINS ){
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

}

export default AbortableFetchWithCaching;
