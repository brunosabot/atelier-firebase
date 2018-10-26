import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import AppContext from "../../App/AppContext";
import { ReactComponent as Home } from "../svg/home.svg";
import { ReactComponent as Add } from "../svg/add.svg";
import { ReactComponent as Notification } from "../svg/notifications.svg";
import { ReactComponent as Person } from "../svg/person.svg";
import styles from "./Navigation.module.css";

const registerCloudMessaging = () => {
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BDI0tJOMHyftbQko0BSbjQfPDHdxZgfJAi3PedDm9SCLN8wo4We4JrOCzt-8s9xj9KHsJKDCyGlzvk4diBTh2no"
  );
  messaging.requestPermission().then(() => {
    messaging.getToken().then(currentToken => {
      if (currentToken) {
        console.log(currentToken);
      } else {
        console.log("No Instance ID token available. Request permission to generate one.");
      }
    });

    messaging.onTokenRefresh(() => {
      messaging.getToken().then(refreshedToken => {
        console.log(refreshedToken);
      });
    });

    messaging.onMessage(payload => {
      console.log(payload);
    });
  });
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
