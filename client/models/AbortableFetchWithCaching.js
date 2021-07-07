import AbortableFetch from './AbortableFetch';

class AbortableFetchWithCaching extends AbortableFetch{
  constructor(){
    super();
  }

  async getCacheOrFetch(url, cacheKey, expires){
    try{
      this._isFetching = true;

      this.removeExpiredCache();

      // Clear cache if there are more than 50 items
      // Protection from overloading localStorage
      if( Object.keys(localStorage).length > 50 ) this.clearAllCache();

      const cachedContent = this.getCache(cacheKey);

      if( cachedContent && cachedContent.cached ){
        this._response = cachedContent;
        this._fetchSucessful = true;
        this._isFetching = false;
      }else{
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
    if( cacheKey && json ){
      localStorage.setItem("aFetch" + cacheKey, JSON.stringify(json));
    }else{
      throw new Error("Invalid cache-key or JSON")
    }
  }

  removeExpiredCache(){
    // Erase anything that will expire within 5 mins
    const FIVE_MINS = Date.now() + 1000 * 60 * 5;
    // Erase anything that will expire in more than 10 days
    // Currently, nothing should be in localStorage for more than 7 days
    const TEN_DAYS = Date.now() + 1000 * 60 * 60 * 24 * 10;

    for( let key in localStorage ){
      if( key.slice(0,6) !== 'aFetch' ){
        continue;
      }
      const content = JSON.parse(localStorage.getItem(key));
      const expires = content && content.cached && new Date(content.cached.expires);
      if( !expires || !expires.getTime() || expires < FIVE_MINS || TEN_DAYS < expires ){
        localStorage.removeItem(key);
      }
    }
  }

  clearAllCache(){
    try{
      const darkMode = localStorage.getItem("dark-mode");
      localStorage.clear();
      localStorage.setItem("dark-mode", darkMode || "off");
    }catch( err ){
      console.error(err);
    }
  }

}

export default AbortableFetchWithCaching;
