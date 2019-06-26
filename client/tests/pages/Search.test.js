import Search from '../../pages/Search';


describe('<Search> without search', () => {
  let wrapper;

  beforeAll((done) => {

    wrapper = mount(
      <MemoryRouter
        initialEntries={[
          { pathname: "/search", search: "" },
        ]}
        initialIndex={0} >
        <Search />
      </MemoryRouter>
    );

    setImmediate(() => {
      done();
    });
  });

  it('should be wrapper in withRouter', () => {
    expect(wrapper.exists("withRouter(Search)")).toEqual(true);
  });

  it('should not display recommendations when user has searched', () => {
    expect(wrapper.exists('Recommendations')).toEqual(true);
    expect(wrapper.exists('PageNavigation')).toEqual(false);
  });
});

describe('<Search> after user search', () => {
  let wrapper, items;


  beforeEach((done) => {
    items = [];
    for(let i = 0; i < 6; i++){
      items.push({
        id: i,
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
        <Search />
      </MemoryRouter>
    );

    setImmediate(() => {
      expect(wrapper.find('h4').text()).toEqual("Searching...");
      wrapper = wrapper.update();
      expect(wrapper.find('h4').text()).toEqual("Search for Title");
      done();
    });
  });

  afterEach(() => {
    fetchMock.restore();
  })

  it('should be wrapper in withRouter', (done) => {
    expect(wrapper.exists("withRouter(Search)")).toEqual(true);
    done();
  });

  it('should not display recommendations when user has searched', (done) => {
    expect(wrapper.exists('Recommendations')).toEqual(false);
    expect(wrapper.exists('PageNavigation')).toEqual(true);
    done();
  });

  it('Should display six books', (done) => {
    const results = wrapper.find(".resultBox");
    results.forEach((book, idx) => {
      const bookInfo = items[idx].volumeInfo;

      const links = book.find("Link");
      expect(links.at(0).prop("to")).toEqual("/books/" + items[idx].id);
      expect(links.at(0).find('img').prop("src")).toEqual(bookInfo.imageLinks.thumbnail);

      expect(links.at(1).prop("to")).toEqual("/books/" + items[idx].id);
      expect(links.at(1).text()).toEqual( bookInfo.title);

      const authorAndPublisher = book.find("p");
      expect(authorAndPublisher.at(0).text()).toEqual("By " + bookInfo.authors.join(", "));
      expect(authorAndPublisher.at(1).text()).toEqual("Publisher: " + bookInfo.publisher);
    });
    done();
  });
});
