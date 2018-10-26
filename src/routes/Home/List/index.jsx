import firebase from "firebase";
import React from "react";
import Card from "../../../components/ui/Card";
import CardActions from "../../../components/ui/CardActions";
import CardButton from "../../../components/ui/CardButton";
import CardButtonIcon from "../../../components/ui/CardButtonIcon";
import CardDescription from "../../../components/ui/CardDescription";
import CardTitle from "../../../components/ui/CardTitle";
import { ReactComponent as Favorite } from "../../../components/svg/favorite.svg";
import { ReactComponent as FavoriteBorder } from "../../../components/svg/favorite_border.svg";
import Meme from "../../../components/ui/Meme";

import styles from "./List.module.css";

const setFavorite = id => () => {
  firebase
    .database()
    .ref(`memes/${id}`)
    .update({
      isFavorite: true
    });
};

class List extends React.Component {
  state = { data: [] };

  firebaseRef = null;

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.firebaseRef.off("value", this.firebaseCallback);
  }

  loadData() {
    this.firebaseRef = firebase.database().ref("/memes");
    this.firebaseCallback = this.firebaseRef.on("value", snap => {
      this.setState({ data: snap.val() });
    });
  }

  render() {
    const { data } = this.state;
    const memeIds = Object.keys(data);

    return (
      <div className={styles.List}>
        {memeIds.map(memeId => (
          <Card key={memeId}>
            <Meme url={data[memeId].url} title={data[memeId].title} />
            <CardTitle>{data[memeId].title}</CardTitle>
            <CardDescription>{data[memeId].description}</CardDescription>
            <CardActions>
              <CardButton url={data[memeId].url}>Afficher</CardButton>
              <CardButtonIcon onClick={setFavorite(memeId)}>
                {data[memeId].isFavorite ? (
                  <Favorite style={{ fill: "#B1003D" }} />
                ) : (
                  <FavoriteBorder />
                )}
              </CardButtonIcon>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}

export default List;
