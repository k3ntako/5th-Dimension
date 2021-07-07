import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const fetch = require('node-fetch');
const fetchMock = require('fetch-mock');
import React from 'react';
import { MemoryRouter } from 'react-router';
const { mount, render, shallow } = require('enzyme');


configure({ adapter: new Adapter() });

window.scroll = () => {};

Object.assign(global, {
  React,
  MemoryRouter,
  fetch,
  fetchMock,
  mount,
  render,
  shallow
});
