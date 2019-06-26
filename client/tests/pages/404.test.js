import React from 'react';
import { MemoryRouter } from 'react-router';
const { mount } = require('enzyme');
import NotFound from '../../pages/404';

describe('<NotFound>', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  });

  it('should display error message and link to homepage', () => {
    expect(wrapper.find('h1').text()).toEqual("Uh oh!");
    expect(wrapper.find('h3').at(0).text()).toEqual("Couldn't find the page you were looking for.");

    const returnLink = wrapper.find('h3').at(1).find("Link");
    expect(returnLink.text()).toEqual("Return Home");
    expect(returnLink.prop("to")).toEqual("/search");
  });
});
