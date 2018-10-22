// import privateRoute from "components/hoc/privateRoute";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import List from "./List";
import Login from "./Login";

const Home = () => (
  <Switch>
    <Route path="/home/list" component={List} />
    <Route path="/home/login" component={Login} />
    <Redirect to="/home/list" />
  </Switch>
);

Home.propTypes = {};

export default Home;
// export default privateRoute(Home);
