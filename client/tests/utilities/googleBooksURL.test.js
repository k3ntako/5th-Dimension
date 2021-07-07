import Search from '../../pages/Search';
import { googleBooksURL, MAX_RESULTS } from '../../utilities/GoogleBooksURL';

const RANDOMID = "RANDOMID";
const SEARCH = "fields=volumeInfo(authors,title)";

describe('GoogleBooksURL utility', () => {
  it('MAX_RESULTS should be 24', (done) => {
    expect(MAX_RESULTS).toEqual(24);
    done();
  });

  it('should create Google Books API url', (done) => {
    const link = googleBooksURL({
      params: RANDOMID,
      search: SEARCH,
      maxResults: 1,
    });

    expect(link).toEqual(
      "https://www.googleapis.com/books/v1/volumes" +
      `/${RANDOMID}` +
      `?maxResults=1` +
      "&key=AIzaSyCiP-gK-4paqp4nt-E8xWZFjTST-2o8E8w" +
      "&" + SEARCH
    )
    done();
  });

  it('should default to 24 max results if max results not passed in', (done) => {
    const link = googleBooksURL({
      params: RANDOMID,
      search: SEARCH,
    });

    expect(link).toEqual(
      "https://www.googleapis.com/books/v1/volumes" +
      `/${RANDOMID}` +
      `?maxResults=${MAX_RESULTS}` +
      "&key=AIzaSyCiP-gK-4paqp4nt-E8xWZFjTST-2o8E8w" +
      "&" + SEARCH
    )
    done();
  });

  it('should not include params if no param is passed in', (done) => {
    const link = googleBooksURL({
      search: SEARCH,
    });

    expect(link).toEqual(
      "https://www.googleapis.com/books/v1/volumes" +
      `?maxResults=${MAX_RESULTS}` +
      "&key=AIzaSyCiP-gK-4paqp4nt-E8xWZFjTST-2o8E8w" +
      "&" + SEARCH
    )
    done();
  });
});
