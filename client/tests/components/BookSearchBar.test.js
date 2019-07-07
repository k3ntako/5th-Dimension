import BookSearchBar from '../../components/BookSearchBar';

describe('<BookSearchBar>', () => {
  let wrapper, input;
  const searchText = "Grace Hopper";

  beforeAll(() => {
    wrapper = mount(
      <MemoryRouter>
        <BookSearchBar />
      </MemoryRouter>
    );

    input = wrapper.find("input");
  });

  it('input should update its value and state on change', () => {
    expect(input.update().prop("value")).toBeFalsy();
    expect(input.prop("className")).not.toContain("hasText");

    input.simulate('change', {
      target: { value: searchText }
    });

    const updatedInput = wrapper.update().find("input");
    expect(updatedInput.prop("value")).toEqual(searchText);
    expect(updatedInput.prop("className")).toContain("hasText");
    expect(wrapper.find("BookSearchBar").state("search")).toEqual(searchText);
  });

  it('', () => {
    expect(input.prop("className")).not.toContain("hasFocus");
    expect(wrapper.find("BookSearchBar").state("hasFocus")).toEqual(false);

    input.simulate('focus');
    const updatedInput = wrapper.update().find("input");
    expect(updatedInput.prop("className")).toContain("hasFocus");
    expect(wrapper.find("BookSearchBar").state("hasFocus")).toEqual(true);
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
  });

  it('', () => {
    const routes = wrapper.find("Router");
    const locationBeforeEnter = routes.prop("history").location;
    expect(locationBeforeEnter.pathname).not.toEqual("/search");
    expect(locationBeforeEnter.search).toEqual("");

    input.simulate("keypress", { key: "Enter" });
    expect(wrapper.find("BookSearchBar").state("hasFocus")).toEqual(false);

    const updatedRoutes = wrapper.update().find("Router");
    const locationAfterEnter = updatedRoutes.prop("history").location;
    expect(locationAfterEnter.pathname).toEqual("/search");
    expect(locationAfterEnter.search).toContain(`q=intitle:${searchText.split(" ").join("+")}`);
    expect(locationAfterEnter.search).toContain("p=0");
  });
});
