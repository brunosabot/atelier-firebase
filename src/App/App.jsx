import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Admin from "../routes/Admin";
import Home from "../routes/Home";
import Navigation from "../components/functionnal/Navigation";
import AppContext from "./AppContext";

firebase.initializeApp({
  apiKey: "AIzaSyCaIP7KRvO3VWH63Rp0n8-GSCZ4AOhyTKw",
  authDomain: "atelier-firebase-f9bdf.firebaseapp.com",
  databaseURL: "https://atelier-firebase-f9bdf.firebaseio.com",
  projectId: "atelier-firebase-f9bdf",
  storageBucket: "atelier-firebase-f9bdf.appspot.com",
  messagingSenderId: "348306530936"
});

class App extends React.Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    });
  }

  doLogUser(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        this.setState({ isAuthenticated: false });
      });
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
