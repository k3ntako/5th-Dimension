import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Nav from './components/Nav';
import Routes from './Routes';

class App extends Component {
  render () {
    return <Router>
      <Nav />
      <Routes />
    </Router>
  }
}

render(<App/>, document.getElementById('app'));
