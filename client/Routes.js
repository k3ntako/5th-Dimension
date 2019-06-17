import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import SearchPage from "./pages/Search";
import BookDetailsPage from "./pages/BookDetails";
import AboutPage from "./pages/About";


export default (props) => {
  return <Switch>
    <Route key="root"    path="/"          exact render={() => <Redirect to="/search"/> }/>
    <Route key="search"  path="/search"    exact component={SearchPage} />
    <Route key="details" path="/books/:id" exact component={BookDetailsPage} />
    <Route key="about"   path="/about"     exact component={AboutPage} />
  </Switch>
}
