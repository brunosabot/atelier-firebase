import React from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../../App/AppContext";
import { ReactComponent as Home } from "../svg/home.svg";
import { ReactComponent as Add } from "../svg/add.svg";
import { ReactComponent as Notification } from "../svg/notifications.svg";
import { ReactComponent as Person } from "../svg/person.svg";
import styles from "./Navigation.module.css";

const registerCloudMessaging = () => {
  // @TODO: Register client for cloud messaging
};

class Navigation extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {state => (
          <div className={styles.Navigation}>
            <NavLink to="/home/list">
              <Home className={styles.Icon} />
            </NavLink>
            {state.values.isAuthenticated ? (
              <NavLink to="/admin/form">
                <Add className={styles.Icon} />
              </NavLink>
            ) : (
              <NavLink to="/home/login">
                <Person className={styles.Icon} />
              </NavLink>
            )}
            <button className={styles.Reset} type="button" onClick={registerCloudMessaging}>
              <Notification className={styles.Icon} />
            </button>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Navigation;
