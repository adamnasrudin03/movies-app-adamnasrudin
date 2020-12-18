import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../Home";
import DetailMovie from "../DetailMovie";
import { Header, Footer } from "../../components";
import "./mainApp.scss";

const MainApp = () => {
  return (
    <div className="main-app-wrapper">
      <Header />
      <div className="content-wrapper">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/movies">
              <Home />
            </Route>
            <Route path="/movies/:id">
              <DetailMovie />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default MainApp;
