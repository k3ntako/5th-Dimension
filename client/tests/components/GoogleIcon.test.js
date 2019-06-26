import React from 'react';
const { mount } = require('enzyme');
import GoogleIcon from '../../components/GoogleIcon';

describe('<GoogleIcon>', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount( <GoogleIcon /> );
  });

  it('should have Google icon wrapped in an <a> tag', () => {
    expect(wrapper.find(".google").exists("a")).toEqual(true);
    const googleLink = wrapper.find("a");
    expect(googleLink.prop("href")).toEqual("https://www.google.com");
    expect(googleLink.prop("target")).toEqual("_blank");
    expect(googleLink.find("img").prop("src")).toEqual("https://books.google.com/googlebooks/images/poweredby.png");
  });
});
