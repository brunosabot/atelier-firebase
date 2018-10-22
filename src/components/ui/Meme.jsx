import React from "react";
import PropTypes from "prop-types";

import styles from "./Meme.module.css";

const Meme = ({ title, url }) => <img className={styles.Meme} src={url} alt={title} />;

Meme.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Meme;
