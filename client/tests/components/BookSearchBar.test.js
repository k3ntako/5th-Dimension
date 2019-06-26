import BookSearchBar from '../../components/BookSearchBar';

describe('<BookSearchBar>', () => {
  let wrapper, bookSearchBar;

  beforeAll(() => {
    wrapper = mount(
      <MemoryRouter>
        <BookSearchBar />
      </MemoryRouter>
    );
  });

  it('should be wrapper in withRouter', () => {
    expect(wrapper.exists("withRouter(BookSearchBar)")).toEqual(true);
  });

  it('should have event handlers', () => {
    const input = wrapper.find("input");
    expect(input.prop("onChange")).toBeDefined();
    expect(input.prop("onFocus")).toBeDefined();
    expect(input.prop("onKeyPress")).toBeDefined();
  });

  it('should display all the search buttons', () => {
    const buttons = wrapper.find(".typeButtons").find("button");
    const buttonTitles = ["All", "Title", "Author", "Publisher", "Category", "ISBN"];

    buttons.forEach((button, idx) => {
      expect(button.text()).toEqual(buttonTitles[idx]);
      expect(button.prop("onClick")).toBeDefined();
      expect(button.hasClass("activeButton")).toEqual(idx === 0);

      button.simulate("click");
      const clickedButton = wrapper.find(".typeButtons").find("button").at(idx);
      expect(clickedButton.hasClass("activeButton")).toEqual(true);
    });
  });

  it('clicking on a button should set state', () => {
    const buttons = wrapper.find(".typeButtons").find("button");
    buttons.at(1).simulate('click'); // Title button
    expect(wrapper.find("BookSearchBar").state("activeType")).toEqual("intitle");
  })
});
