import React from 'react';
import Cookies from "js-cookie";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { PAGES } from "./constants";
import { HomePage } from "./pages/HomePage";

function App() {
    const pinnedPlayer = Cookies.get("pinnedPlayer");

  return (
      <Router basename={process.env.PUBLIC_URL}>
          <Switch>
              <Route exact path={"/"}>
                  {pinnedPlayer ? <Redirect to={`/search/${pinnedPlayer}`}/> : <Redirect to={"/home"}/>}
              </Route>
              {PAGES.map((page) => <Route key={page.path} path={`/${page.path}/:slug`}><page.component /></Route>)}
              <Route path="/home">      <HomePage />    </Route>
              {/*<Route path="/search">    <SearchPage />  </Route>*/}
          </Switch>
      </Router>
  );
}

export default App;
