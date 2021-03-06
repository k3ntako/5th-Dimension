const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const GOOGLE_API_KEY = "&key=" + "AIzaSyCiP-gK-4paqp4nt-E8xWZFjTST-2o8E8w";
const MAX_RESULTS = 24;

const googleBooksURL = ({ params, search, maxResults = MAX_RESULTS }) => {
  let url = BASE_URL;

  if( params ) url += "/" + params;
  url += `?maxResults=${maxResults}` + GOOGLE_API_KEY;
  if( search ) url += "&" + search;

  return url;
}

const bookFields = ({ imageType = "thumbnail", additionVInfoFields, isSearch }) => {
  const addFields = additionVInfoFields ? "," + additionVInfoFields : "";
  let fields = `volumeInfo(authors,imageLinks(${imageType}),publisher,title,subtitle${addFields})`;

  if( isSearch ){
    fields = `totalItems,items(id,${fields})`;
  }

  return `fields=${fields}`;
}


module.exports = {
  googleBooksURL,
  bookFields,
  MAX_RESULTS,
}
