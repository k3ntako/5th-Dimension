import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Routes from './Routes';

class App extends Component {
  render () {
    return <Router>
      <Nav />
      <Routes />
      <Footer />
    </Router>
  }
}

render(<App/>, document.getElementById('app'));
