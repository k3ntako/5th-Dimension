import About from '../../pages/About';

describe('<About>', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(   <About /> );
  });

  it('should display headings', () => {
    expect(wrapper.find('h3').text()).toEqual("About");

    const subheadings = wrapper.find('h4');
    expect(subheadings.at(0).text()).toEqual("Name: 5th Dimension");
    expect(subheadings.at(1).text()).toEqual("Developer");
  });

  it('should display spoiler warning', () => {
    expect(wrapper.text()).toContain("NOTE: This contains spoilers about the movie, Interstellar (2014).");
  });

  it('should contain links to APIs and Github', () => {
    const links = wrapper.find("a");
    expect(links.at(0).text()).toEqual("Google Books API Family");
    expect(links.at(0).prop("href")).toEqual("https://developers.google.com/books/docs/overview");
    expect(links.at(0).prop("target")).toEqual("_blank");

    expect(links.at(1).text()).toEqual("New York Times' Books API");
    expect(links.at(1).prop("href")).toEqual("https://developer.nytimes.com/docs/books-product/1/overview");
    expect(links.at(1).prop("target")).toEqual("_blank");

    expect(links.at(2).text()).toEqual("Github");
    expect(links.at(2).prop("href")).toEqual("https://github.com/k3ntako/5th-Dimension");
    expect(links.at(2).prop("target")).toEqual("_blank");
  });
});
