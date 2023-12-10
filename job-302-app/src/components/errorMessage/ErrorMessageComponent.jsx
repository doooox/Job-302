import styles from "./ErrorMessageComponent.module.css";

const ErrorMessageComponent = ({ errors }) => {
  return <div className={styles.error}>{errors}</div>;
};

export default ErrorMessageComponent;
