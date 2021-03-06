import SearchPage from '../../pages/Search';
import { MAX_RESULTS } from '../../utilities/GoogleBooksURL';


describe('<SearchPage> without search', () => {
  let wrapper;

  beforeAll((done) => {

    wrapper = mount(
      <MemoryRouter
        initialEntries={[
          { pathname: "/search", search: "" },
        ]}
        initialIndex={0} >
        <SearchPage />
      </MemoryRouter>
    );

    setImmediate(() => {
      done();
    });
  });


  it('should not display recommendations when user has searched', (done) => {
    expect(wrapper.exists('Recommendations')).toEqual(true);
    expect(wrapper.exists('PageNavigation')).toEqual(false);
    done();
  });
});

describe('<SearchPage> after user search', () => {
  let wrapper, items;


  beforeEach((done) => {
    items = [];
    for(let i = 0; i < MAX_RESULTS; i++){
      items.push({
        id: String(i),
        volumeInfo: {
          authors: ["Author" + i],
          imageLinks: { thumbnail: "http://www.example.com/image/" + i },
          publisher: "Publisher" + i,
          title: "Title" + i
        }
      });
    }

    fetchMock.get( "*" , {
      status: 200,
      body: {
        totalItems: 200,
        items: items
      }
    });

    wrapper = mount(
      <MemoryRouter
        initialEntries={[
          { pathname: '/search', search: '?q=Title' },
        ]}
        initialIndex={0} >
        <SearchPage />
      </MemoryRouter>
    );

    setImmediate(() => {
      expect(wrapper.find('h4').text()).toEqual("Searching...");
      wrapper = wrapper.update();
      expect(wrapper.find('h4').text()).toEqual("Search for Title");
      done();
    });
  });

  afterEach((done) => {
    fetchMock.restore();
    done();
  })

  it('should not display recommendations when user has searched', (done) => {
    expect(wrapper.exists('Recommendations')).toEqual(false);
    expect(wrapper.exists('PageNavigation')).toEqual(true);
    done();
  });

  it('should display twenty-four books', (done) => {
    const results = wrapper.find(".resultBox");
    expect(results.length).toEqual(MAX_RESULTS);

    results.forEach((book, idx) => {
      const bookInfo = items[idx].volumeInfo;

      const links = book.find("Link");
      expect(links.at(0).prop("to")).toEqual("/books/" + items[idx].id);
      expect(links.at(0).find('img').prop("src")).toEqual(bookInfo.imageLinks.thumbnail);

      expect(links.at(1).prop("to")).toEqual("/books/" + items[idx].id);
      expect(links.at(1).text()).toEqual( bookInfo.title);

      const authorAndPublisher = book.find("p");
      expect(authorAndPublisher.at(0).text()).toEqual("By: " + bookInfo.authors.join(", "));
      expect(authorAndPublisher.at(1).text()).toEqual("Publisher: " + bookInfo.publisher);
    });
    done();
  });

  it('should display pageNavigation with next button and Google icon', (done) => {
    const pageNavigation = wrapper.find("PageNavigation");
    expect(pageNavigation.find("a").prop("href")).toEqual("https://www.google.com");
    expect(pageNavigation.find("img").prop("src")).toEqual("https://books.google.com/googlebooks/images/poweredby.png");

    const nextButton = pageNavigation.find("button.next");
    expect(nextButton.text()).toEqual("Next");
    expect(nextButton.exists("IoMdArrowRoundForward")).toEqual(true);
    expect(pageNavigation.exists("IoMdArrowRoundBack")).toEqual(false);
    done();
  });

  it('should navigate to next page and back button should exist', (done) => {
    // page 1
    const pageNavigation = wrapper.find("PageNavigation");
    expect(pageNavigation.prop("currentPage")).toEqual(0);

    // click next button
    const nextButton = pageNavigation.find("button.next");
    nextButton.simulate("click");
    wrapper.update();

    // page 2
    const nextPageNavigation = wrapper.find("PageNavigation");
    expect(nextPageNavigation.prop("currentPage")).toEqual(1);
    expect(nextPageNavigation.exists("IoMdArrowRoundForward")).toEqual(true);
    expect(nextPageNavigation.exists("IoMdArrowRoundBack")).toEqual(true);

    // click back button
    const prevButton = nextPageNavigation.find("button.prev");
    prevButton.simulate("click");
    wrapper.update();

    // page 1
    const prevPageNavigation = wrapper.find("PageNavigation");
    expect(prevPageNavigation.prop("currentPage")).toEqual(0);
    expect(prevPageNavigation.exists("IoMdArrowRoundForward")).toEqual(true);
    expect(prevPageNavigation.exists("IoMdArrowRoundBack")).toEqual(false);
    done();
  });

  it('should have next page loaded', (done) => {
    const search = wrapper.find("SearchPage");
    const searcher = search.state("searcher");
    expect(Object.keys(searcher.results).length).toEqual(2);
    done();
  });
});

describe('<SearchPage> on second page of search', () => {
  let wrapper, items;

  beforeEach((done) => {
    items = [];
    for(let i = 0; i < 6; i++){
      items.push({
        id: String(i),
        volumeInfo: {
          authors: ["Author" + i],
          imageLinks: { thumbnail: "http://www.example.com/image/" + i },
          publisher: "Publisher" + i,
          title: "Title" + i
        }
      });
    }

    fetchMock.get( "*" , {
      status: 200,
      body: {
        totalItems: 200,
        items: items
      }
    });

    wrapper = mount(
      <MemoryRouter
        initialEntries={[
          { pathname: '/search', search: '?q=Title&p=1' },
        ]}
        initialIndex={0} >
        <SearchPage />
      </MemoryRouter>
    );

    setImmediate(() => {
      wrapper = wrapper.update();
      done();
    });
  });

  afterEach((done) => {
    fetchMock.restore();
    done();
  })

  it('should display pageNavigation without next button and Google icon', (done) => {
    const pageNavigation = wrapper.find("PageNavigation");
    const backButton = pageNavigation.find("button.prev");
    expect(backButton.text()).toEqual("Back");
    expect(backButton.exists("IoMdArrowRoundBack")).toEqual(true);
    expect(pageNavigation.exists("IoMdArrowRoundForward")).toEqual(false);
    // next button hidden because there are less than MAX_RESULTS, 24, (aka a full page)
    done();
  });
});
