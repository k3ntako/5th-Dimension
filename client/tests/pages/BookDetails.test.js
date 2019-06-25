import React from 'react';
const { mount, render } = require('enzyme');
import BookDetails from '../../pages/BookDetails';
import AbortableFetchGoogle from '../../models/AbortableFetchGoogle';

const descriptionTitle = "The Year 2000";
const descriptionOne = "This is a book about what I think the year 2000 will look like. I promise there will be flying horses.";
const descriptionTwo = "I think you will enjoy this one!";

describe('<BookDetails> component with book info', () => {
  let wrapper, bookFetch, volumeInfo;

  beforeAll(() => {
    const match = { params: { id: "SHGJ23FD6" }};

    wrapper = mount(
      <BookDetails match={match}/>
    );

    bookFetch = new AbortableFetchGoogle;
    bookFetch._fetchSucessful = true;
    bookFetch._isFetching = false;
    bookFetch._response = {
      volumeInfo: {
        authors: ["George Washington"],
        categories: ["US"],
        description: `<h3>${descriptionTitle}</h3><p>${descriptionOne}</p><p>${descriptionTwo}</p>`,
        imageLinks: {
          small: "http://www.example.com/image/1"
        },
        industryIdentifiers: [
          { type: "ISBN_10", identifier: "1234567890" },
          { type: "ISBN_13", identifier: "1234567890123" },
        ],
        pageCount: 400,
        previewLink: "http://www.example.com",
        publishedDate: "1798-02-22",
        publisher: "Minuteman Publishing",
        title: "The Year 2000",
        subtitle: "The Future"
      }
    };
    volumeInfo = bookFetch.response.volumeInfo;
    wrapper.setState({ bookFetch });
  });

  it('should display book title, subtitle and image', () => {
    expect(wrapper.find('h2.title').text()).toEqual(volumeInfo.title);
    expect(wrapper.find('h4.subtitle').text()).toEqual(volumeInfo.subtitle);
    expect(wrapper.find('img.coverImage').prop("src")).toEqual(volumeInfo.imageLinks.small);
  });

  it('should display book info', () => {
    const info = wrapper.find("div.info");
    const infoDivs = info.findWhere(node => {
      return node.type() === "div" && !node.prop("className");
    });

    const dateSplit = volumeInfo.publishedDate.split("-")
    const publishedDate = new Date(Date.UTC(dateSplit[0], dateSplit[1], [2], 12));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const publishedDateHTML = publishedDate.toLocaleDateString('en-US', options);

    const infoMap = [
      { title: "Publisher", info: volumeInfo.publisher },
      { title: "Published", info: publishedDateHTML },
      { title: "Page Count", info: volumeInfo.pageCount + " pages" },
      { title: "ISBN 10", info: volumeInfo.industryIdentifiers[0].identifier },
      { title: "ISBN 13", info: volumeInfo.industryIdentifiers[1].identifier },
      { title: "Category", info: volumeInfo.categories.join(", ") },
      { title: "More at Google Books", info: volumeInfo.previewLink }
    ];

    expect(infoDivs.length).toEqual(7);
    infoDivs.forEach((div, idx) => {
      if( idx < 6 ){
        expect(div.find("strong").text()).toEqual(infoMap[idx].title);
        expect(div.text()).toEqual(`${infoMap[idx].title}: ${infoMap[idx].info}`);
      }else if( idx === 6){
        const link = div.find("a");
        expect(link.text()).toEqual(infoMap[idx].title);
        expect(link.prop("href")).toEqual(infoMap[idx].info);
      }
    });
  });

  it('should display book description with HTML', () => {
    const description = wrapper.find(".description").render();
    const heading = description.find('h3')
    expect(heading.length).toEqual(1);
    expect(heading.text()).toEqual(descriptionTitle);

    const paragraph = description.find('p');
    expect(paragraph.length).toEqual(2);
    expect(paragraph.eq(0).text()).toEqual(descriptionOne);
    expect(paragraph.eq(1).text()).toEqual(descriptionTwo);
  });
});