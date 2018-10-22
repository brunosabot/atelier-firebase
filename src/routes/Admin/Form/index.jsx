import React from "react";
import Card from "../../../components/ui/Card";
import styles from "./Form.module.css";
import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";

class Form extends React.Component {
  state = {
    title: "",
    description: "",
    file: ""
  };

  handleTitle = e => {
    this.setState({ title: e.target.value });
  };

  handleDescription = e => {
    this.setState({ description: e.target.value });
  };

  handleFile = e => {
    this.setState({ file: e.target.files[0] });
  };

  // Disabled while in @TODO
  // eslint-disable-next-line class-methods-use-this
  submit() {
    // @TODO: Upload file to server and register in database
  }

  render() {
    const { description, title } = this.state;

    return (
      <div className={styles.Form}>
        <Card>
          {/* Handled by Input tag */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label className={styles.Field} htmlFor="title">
            Le titre du meme
            <Input id="title" name="title" value={title} onChange={this.handleTitle} />
          </label>
          {/* Handled by Input tag */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label className={styles.Field} htmlFor="description">
            La description du même
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={this.handleDescription}
            />
          </label>
          {/* Handled by Input tag */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label className={styles.Field} htmlFor="file">
            Le fichier à enregistrer
            <Input id="file" type="file" name="file" onChange={this.handleFile} />
          </label>
          <button className={styles.Button} type="button" onClick={this.submit}>
            Enregistrer le meme
          </button>
        </Card>
      </div>
    );
  }
}

export default Form;
