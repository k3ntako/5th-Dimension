import BookDetails from '../../pages/BookDetails';
import AbortableFetchGoogle from '../../models/AbortableFetchGoogle';
import { googleBooksURL } from '../../utilities/GoogleBooksURL';

const descriptionTitle = "The Year 2000";
const descriptionOne = "This is a book about what I think the year 2000 will look like. I promise there will be flying horses.";
const descriptionTwo = "I think you will enjoy this one!";

const BOOK_LINK = googleBooksURL({
  params: "SHGJ23FD6",
  search: "fields=volumeInfo(authors,categories,description,industryIdentifiers,imageLinks(small),pageCount,previewLink,publishedDate,publisher,title,subtitle)"
});

const BOOK_RESPONSE = {
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


describe('<BookDetails> component with book info', () => {
  let wrapper;
  const volumeInfo = BOOK_RESPONSE.volumeInfo;

  beforeEach((done) => {
    const match = { params: { id: "SHGJ23FD6" }};
    fetchMock.get(BOOK_LINK, {
      status: 200,
      body: BOOK_RESPONSE
    });

    wrapper = mount( <MemoryRouter><BookDetails match={match}/></MemoryRouter> );
    setImmediate(() => {
      wrapper = wrapper.update();
      done();
    });
  });

  afterEach((done) => {
    fetchMock.restore();
    done();
  })

  it('should display book title, subtitle and image', (done) => {
    expect(wrapper.find('h2.title').text()).toEqual(volumeInfo.title);
    expect(wrapper.find('h4.subtitle').text()).toEqual(volumeInfo.subtitle);
    expect(wrapper.find('img.coverImage').prop("src")).toEqual(volumeInfo.imageLinks.small);
    done();
  });

  it('should display book info', (done) => {
    const info = wrapper.find("div.info");
    const infoDivs = info.findWhere(node => {
      return node.type() === "div" && !node.prop("className");
    });

    const dateSplit = volumeInfo.publishedDate.split("-");
    const publishedDate = new Date(Date.UTC(dateSplit[0], dateSplit[1], dateSplit[2], 12));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const publishedDateHTML = publishedDate.toLocaleDateString('en-US', options);

    const infoMap = [
      { title: "By", info: "George Washington" },
      { title: "Publisher", info: volumeInfo.publisher },
      { title: "Published", info: publishedDateHTML },
      { title: "Page Count", info: volumeInfo.pageCount + " pages" },
      { title: "ISBN 10", info: volumeInfo.industryIdentifiers[0].identifier },
      { title: "ISBN 13", info: volumeInfo.industryIdentifiers[1].identifier },
      { title: "Category", info: volumeInfo.categories.join(", ") },
      { title: "More at Google Books", info: volumeInfo.previewLink }
    ];

    expect(infoDivs.length).toEqual(8);
    infoDivs.forEach((div, idx) => {
      if( idx < 7 ){
        expect(div.find("strong").text()).toEqual(infoMap[idx].title);
        expect(div.text()).toEqual(`${infoMap[idx].title}: ${infoMap[idx].info}`);
      }else if( idx === 7 ){
        const link = div.find("a");
        expect(link.text()).toEqual(infoMap[idx].title);
        expect(link.prop("href")).toEqual(infoMap[idx].info);
      }
    });
    done();
  });

  it('should display book description with HTML', (done) => {
    const description = wrapper.find(".description").render();
    const heading = description.find('h3')
    expect(heading.length).toEqual(1);
    expect(heading.text()).toEqual(descriptionTitle);

    const paragraph = description.find('p');
    expect(paragraph.length).toEqual(2);
    expect(paragraph.eq(0).text()).toEqual(descriptionOne);
    expect(paragraph.eq(1).text()).toEqual(descriptionTwo);
    done();
  });
});
