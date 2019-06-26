import React from 'react';
const { mount } = require('enzyme');
import GoogleIcon from '../../components/GoogleIcon';

describe('<GoogleIcon>', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount( <GoogleIcon /> );
  });

  it('should have Google icon wrapped in an <a> tag', () => {
    const googleLinkHTML = <a href="https://www.google.com">
      <img src="https://books.google.com/googlebooks/images/poweredby.png" />
    </a>

    expect(wrapper.find(".google").contains(googleLinkHTML)).toEqual(true);
    const googleLink = wrapper.find("a");
    expect(googleLink.prop("href")).toEqual("https://www.google.com");
    expect(googleLink.find("img").prop("src")).toEqual("https://books.google.com/googlebooks/images/poweredby.png");
  });
});
