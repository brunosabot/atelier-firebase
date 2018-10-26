import React from "react";
import firebase from "firebase";
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

  submit = () => {
    const { description, file, title } = this.state;

    const storageRef = firebase.storage().ref();
    const memeRef = storageRef.child(`memes/${file.name}`);
    const uploadTask = memeRef.put(file);

    uploadTask.then(() => memeRef.getDownloadURL()).then(url => {
      this.firebaseRef = firebase
        .database()
        .ref("/memes")
        .push();

      this.firebaseRef.set({
        title,
        description,
        url,
        isFavorite: false
      });
    });
  };

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
