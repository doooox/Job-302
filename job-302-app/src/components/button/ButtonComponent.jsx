import React from "react";
import styles from "./ButtonComponents.module.css";

const ButtonComponent = ({ text, style }) => {
  const dynamicStyle = styles[style];

  return <button className={dynamicStyle}>{text}</button>;
};

export default ButtonComponent;
