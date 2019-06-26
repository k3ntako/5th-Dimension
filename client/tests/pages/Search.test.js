import React from 'react';
import { MemoryRouter } from 'react-router';
const { mount } = require('enzyme');
import Search from '../../pages/Search';


describe('<Search> without search', () => {
  let wrapper;

  beforeAll(() => {

    wrapper = mount(
      <MemoryRouter
        initialEntries={[
          { pathname: "/search", search: "" },
        ]}
        initialIndex={0} >
        <Search />
      </MemoryRouter>
    );
  });

  it('should be wrapper in withRouter', () => {
    expect(wrapper.exists("withRouter(Search)")).toEqual(true);
  });

  it('should not display recommendations when user has searched', () => {
    expect(wrapper.exists('Recommendations')).toEqual(true);
  });
});

describe('<Search> after user search', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <MemoryRouter
        initialEntries={[
          { pathname: '/search', search: '?q=asd' },
        ]}
        initialIndex={0} >
        <Search />
      </MemoryRouter>
    );
  });

  it('should be wrapper in withRouter', () => {
    expect(wrapper.exists("withRouter(Search)")).toEqual(true);
  });

  it('should not display recommendations when user has searched', () => {
    expect(wrapper.exists('Recommendations')).toEqual(false);
  });
});
