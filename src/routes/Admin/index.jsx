// import privateRoute from "components/hoc/privateRoute";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Form from "./Form";

const Admin = () => (
  <Switch>
    <Route path="/admin/form" component={Form} />
    <Redirect to="/admin/form" />
  </Switch>
);

Admin.propTypes = {};

export default Admin;
// export default privateRoute(Admin);
