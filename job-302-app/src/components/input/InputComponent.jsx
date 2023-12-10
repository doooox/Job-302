// InputComponent.js
import React from "react";
import ErrorMessageComponent from "../errorMessage/ErrorMessageComponent";
import styles from "./InputComponent.module.css";

const InputComponent = ({
  label,
  type = "text",
  register,
  name,
  required,
  errors,
  icon,
}) => (
  <div className={styles.inputContainer}>
    <label className={styles.label}>{label}:</label>
    <div className={styles.inputWrapper}>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
      <input
        type={type}
        {...register(name, { required: required && `${label} is required` })}
        className={styles.input}
      />
    </div>
    {errors && <ErrorMessageComponent errors={errors[name]?.message} />}
  </div>
);

export default InputComponent;
