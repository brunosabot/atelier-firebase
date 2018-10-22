import React from "react";

import styles from "./CardButton.module.css";

const CardButton = ({ children, url, ...props }) => (
  <a className={styles.CardButton} href={url} rel="noopener noreferrer" target="_blank" {...props}>
    {children}
  </a>
);

export default CardButton;
