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

// id is not used while the function is @TODO
// eslint-disable-next-line no-unused-vars
const setFavorite = id => () => {
  // @TODO: Set favorite
};

class List extends React.Component {
  state = { data: [] };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    // @TODO: Load data from Firebase's
    this.setState({
      data: {
        "3a954410-1b30-409b-8f28-2a6e1c7c6a32": {
          url: "https://i.imgflip.com/mqh2g.jpg",
          title: "Welcome 2 da real world",
          description:
            "Je me souviens en fait, je sais que, grâce à ma propre vérité c'est juste une question d'awareness et c'est une sensation réelle qui se produit si on veut ! Mais ça, c'est uniquement lié au spirit.",
          isFavorite: true
        },
        "6c46bf35-aacf-4a98-a181-7fe63ee53976": {
          url: "http://m.memegen.com/rtofmq.jpg",
          title: "It's so easy even I can do it",
          description:
            "Tu comprends, même si on frime comme on appelle ça en France... il y a de bonnes règles, de bonnes rules et cela même si les gens ne le savent pas ! Il y a un an, je t'aurais parlé de mes muscles.",
          isFavorite: false
        }
      }
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
