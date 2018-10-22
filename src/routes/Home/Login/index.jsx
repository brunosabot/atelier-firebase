import React from "react";
import AppContext from "../../../App/AppContext";
import Input from "../../../components/ui/Input";
import Card from "../../../components/ui/Card";

import styles from "./Login.module.css";

class Login extends React.Component {
  state = {
    login: "",
    password: ""
  };

  handleLogin = e => {
    this.setState({ login: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { login, password } = this.state;

    return (
      <div className={styles.Login}>
        <AppContext.Consumer>
          {state => (
            <Card>
              {/* Handled by Input tag */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
              <label className={styles.Field} htmlFor="login">
                Nom d&apos;utilisateur
                <Input id="login" name="login" onChange={this.handleLogin} value={login} />
              </label>
              {/* Handled by Input tag */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
              <label className={styles.Field} htmlFor="password">
                Mot de passe
                <Input
                  id="password"
                  name="password"
                  onChange={this.handlePassword}
                  value={password}
                />
              </label>
              <button
                className={styles.Button}
                onClick={() => state.actions.doLogUser(login, password)}
                type="button"
              >
                Vous connecter
              </button>
            </Card>
          )}
        </AppContext.Consumer>
      </div>
    );
  }
}

export default Login;
