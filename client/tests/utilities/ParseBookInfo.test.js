import { parseBookInfo } from '../../utilities/ParseBookInfo';

const BOOK_DETAILS = {
  authors: ["Jayson Tatum"],
  categories: ["Sports & Recreation / Basketball"],
  description: "<b>It's a good book</b>",
  imageLinks: {small: "https://example.com/image.jpg"},
  industryIdentifiers: [
    {type: "ISBN_10", identifier: "0000000000"},
    {type: "ISBN_13", identifier: "0000000000000"}
  ],
  pageCount: 1718,
  previewLink: "https://www.example.com/books/zero",
  publishedDate: "2017-06-22",
  publisher: "Zero Publishing",
  title: "Zero",
};

const BOOK_DETAILS_EXPECTED = [
  { title: "By", info: "Jayson Tatum" },
  { title: "Publisher", info: "Zero Publishing" },
  { title: "Published", info: "June 22, 2017" },
  { title: "Page Count", info: "1718 pages" },
  { title: "ISBN 10", info: "0000000000" },
  { title: "ISBN 13", info: "0000000000000" },
  { title: "Category", info: "Sports & Recreation / Basketball" },
];

const SEARCH = {
  authors: ["Jayson Tatum"],
  imageLinks: {thumbnail: "https://example.com/image.jpg"},
  publisher: "Zero Publishing",
  title: "Zero",
};

const SEARCH_EXPECTED = [
  { title: "By", info: "Jayson Tatum" },
  { title: "Publisher", info: "Zero Publishing" },
];

describe('SearchHelper utility', () => {
  it('should return query and page given query string', (done) => {
    expect(parseBookInfo(BOOK_DETAILS)).toEqual(BOOK_DETAILS_EXPECTED);
    done();
  });

  it('should only return fields that were passed in', (done) => {
    expect(parseBookInfo(SEARCH)).toEqual(SEARCH_EXPECTED);
    done();
  });

  it('should respect plurarlity of categories', (done) => {
    let newBookDetails = BOOK_DETAILS;
    newBookDetails.categories.push("Fiction / Fantasy");

    const titles = parseBookInfo(newBookDetails).map( dataPoint => dataPoint.title );
    expect(titles).toContain("Categories");
    expect(titles).not.toContain("Category");
    done();
  });

  it('should return raw date data if given unexpected format', (done) => {
    let newBookDetails = BOOK_DETAILS;
    newBookDetails.publishedDate =  "2017-06";

    const info = parseBookInfo(newBookDetails).map( dataPoint => dataPoint.info );
    expect(info).toContain("2017-06");

    const publishedDate = new Date(Date.UTC(2017, 6 - 1 ));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    expect(info).not.toContain(publishedDate.toLocaleDateString('en-US', options));

    done();
  });
});
