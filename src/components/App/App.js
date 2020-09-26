import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import GlobalStyles from "../GlobalStyles";

import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";
import Artist from "../Artist";

const App = () => {
  const path = "/artist/0hprEC0nsWuQPSHag1O2Vi";

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        // console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Redirect to={path} />
        </Route>
        <Route path="/artist/:id">
          <Artist />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
