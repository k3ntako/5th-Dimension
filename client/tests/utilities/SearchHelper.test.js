import { parseQuery } from '../../utilities/SearchHelper';

describe('SearchHelper utility', () => {
  it('should return query and page given query string', (done) => {
    const parsed = parseQuery("q=intitle:farming&p=12");
    expect(parsed.q).toEqual("intitle:farming");
    expect(parsed.p).toEqual(12);
    done();
  });

  it('should replace "+" with space', (done) => {
    const parsed = parseQuery("q=intitle:super+farming");
    expect(parsed.q).toEqual("intitle:super farming");
    done();
  });

  it('should default page to 0 given no page', (done) => {
    const parsed = parseQuery("q=intitle:super+farming");
    expect(parsed.p).toEqual(0);
    done();
  });

  it('should be undefined if no query given', (done) => {
    const parsed = parseQuery("p=12");
    expect(parsed.q).toEqual(undefined);
    expect(parsed.p).toEqual(12);
    done();
  });
});
