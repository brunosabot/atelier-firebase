import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Admin from "../routes/Admin";
import Home from "../routes/Home";
import Navigation from "../components/functionnal/Navigation";
import AppContext from "./AppContext";

// @TODO: Initialize Firebase

class App extends React.Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    // Check if user is authenticated
  }

  // Disabled while in @TODO
  // eslint-disable-next-line class-methods-use-this
  doLogUser(email, password) {
    // @TODO Handle auth user
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <AppContext.Provider
        value={{
          values: {
            isAuthenticated
          },
          actions: {
            doLogUser: this.doLogUser
          }
        }}
      >
        <BrowserRouter>
          <React.Fragment>
            <Navigation />
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/home" component={Home} />
              <Redirect to="/home" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}

export default App;
