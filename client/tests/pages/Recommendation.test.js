import React from 'react';
import { MemoryRouter } from 'react-router'
const { mount } = require('enzyme');
import Recommendations from '../../pages/Search/Recommendations';


describe('<Recommendations>', () => {
  let wrapper, bestSellers;

  beforeAll(() => {

    wrapper = mount(
      <MemoryRouter>
        <Recommendations />
      </MemoryRouter>
    );

    bestSellers = [];
    for(let i = 0; i < 6; i++){
      bestSellers.push({
        id: i,
        volumeInfo: {
          authors: ["Author" + i],
          imageLinks: { thumbnail: "http://www.example.com/image/" + i },
          publisher: "Publisher" + i,
          title: "Title" + i
        }
      });
    }
    wrapper.find("Recommendations").setState({ bestSellers });
  });

  it('Should display three headings', () => {
    const title = wrapper.find("h1.title");
    const subtitle = wrapper.find("h3.subtitle");
    expect(title.text()).toEqual("5th Dimension");
    expect(title.hasClass("websiteName")).toEqual(true);
    expect(subtitle.text()).toEqual("Book Search");
    expect(subtitle.hasClass("websiteName")).toEqual(true);

    const nytTitle = wrapper.find("h4");
    expect(nytTitle.text()).toEqual("New York Times Best Sellers: Fiction");
    expect(nytTitle.hasClass("websiteName")).toEqual(false);
  });

  it('Should display six books', () => {
    const results = wrapper.find(".resultBox");
    results.forEach((book, idx) => {
      const bookInfo = bestSellers[idx].volumeInfo;

      const links = book.find("Link");
      expect(links.at(0).prop("to")).toEqual("/books/" + bestSellers[idx].id);
      expect(links.at(0).find('img').prop("src")).toEqual(bookInfo.imageLinks.thumbnail);

      expect(links.at(1).prop("to")).toEqual("/books/" + bestSellers[idx].id);
      expect(links.at(1).text()).toEqual( bookInfo.title);

      const authorAndPublisher = book.find("p");
      expect(authorAndPublisher.at(0).text()).toEqual("By " + bookInfo.authors.join(", "));
      expect(authorAndPublisher.at(1).text()).toEqual("Publisher: " + bookInfo.publisher);
    })
  });
});
