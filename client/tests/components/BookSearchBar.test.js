import React from 'react';
import { MemoryRouter } from 'react-router';
const { mount } = require('enzyme');
import BookSearchBar from '../../components/BookSearchBar';

describe('<BookSearchBar>', () => {
  let wrapper;

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
    const buttons = wrapper.find(".buttons").find("button");
    const buttonTitles = ["All", "Title", "Author", "Publisher", "Category", "ISBN"]

    buttons.forEach(async (button, idx) => {
      expect(button.text()).toEqual(buttonTitles[idx]);
      expect(button.prop("onClick")).toBeDefined();
    });
  });
});
