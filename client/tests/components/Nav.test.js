import Nav from '../../components/Nav';

describe('<Nav>', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
  });

  it('should have two website titles (desktop and mobile)', () => {
    const titleAndSearch = wrapper.find(".titleAndSearch");
    const link = titleAndSearch.find("Link");
    expect(link.prop("to")).toEqual("/search");

    const websiteTitles = link.find("h3");
    expect(websiteTitles.at(0).hasClass("mobile")).toEqual(true);
    expect(websiteTitles.at(0).text()).toEqual("5D");
    expect(websiteTitles.at(1).hasClass("desktop")).toEqual(true);
    expect(websiteTitles.at(1).text()).toEqual("5th Dimension");
  });

  it('should have BookSearchBar', () => {
    const titleAndSearch = wrapper.find(".titleAndSearch");
    expect(titleAndSearch.exists("BookSearchBar")).toEqual(true);
  });


  it('should contain a menu for mobile', () => {
    const menu = wrapper.find(".menu");
    expect(menu.hasClass("mobile")).toEqual(true);
    expect(menu.hasClass("desktop")).toEqual(false);
    expect(menu.exists("FaBars")).toEqual(true);

    const menuItems = menu.find(".menuItems");
    expect(menuItems.find(".backgroundClick").text()).toEqual("");

    const aboutLink = menuItems.find("Link");
    expect(aboutLink.prop("to")).toEqual("/about");
    expect(aboutLink.text()).toEqual("About 5th Dimension");

    const toggleDarkMode = menuItems.find("a").at(1);
    expect(toggleDarkMode.text()).toEqual("Turn On Dark Mode");
  });

  it('should contain buttons for desktop', () => {
    const navButtons = wrapper.find(".navButtons");
    expect(navButtons.hasClass("desktop")).toEqual(true);
    expect(navButtons.hasClass("mobile")).toEqual(false);

    const settings = navButtons.find(".settings");
    expect(settings.prop("onClick")).toBeDefined();
    expect(settings.exists("FaSun")).toEqual(true);
    expect(settings.exists("FaMoon")).toEqual(false);

    settings.find("FaSun").simulate("click");
    const updatedSettings = wrapper.find(".settings");
    expect(updatedSettings.exists("FaSun")).toEqual(false); //
    expect(updatedSettings.exists("FaMoon")).toEqual(true);

    const info = navButtons.find(".info");
    const link = info.find("Link");
    expect(link.prop("to")).toEqual("/about");
    expect(link.exists("MdInfo")).toEqual(true);
  });
});
