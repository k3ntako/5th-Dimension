import AbortableFetch from './AbortableFetch';

class AbortableFetchGoogle extends AbortableFetch{
  constructor(){
    super();
  }

  get first(){
    if( !this._fetchSucessful || this._isFetching || !this._response  ){
      return null;
    }

    if( this._response.items ){
      return this._response.items[0];
    }else if( this._response.volumeInfo ){
      return this._response;
    }else{
      console.log("Nothing returned:", this._response);
    }
  }

  get all(){
    if( !this._fetchSucessful || this._isFetching ){
      return null;
    }

    if( this._response && this._response.items ){
      return this._response.items;
    }
  }
}

export default AbortableFetchGoogle;
