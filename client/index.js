import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

class App extends Component {
  render () {
    return <Router>
      <Routes />
    </Router>
  }
}

render(<App/>, document.getElementById('app'));
