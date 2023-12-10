import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

import { ROUTES } from "../../../utils/static";
import { useLoginMutation } from "../../../store/slices/UserApiSlice";
import { setCredentials } from "../../../store/slices/AuthSlice";

import useAuthGuard from "../../../hooks/useAuthGuard";
import ButtonComponent from "../../../components/button/ButtonComponent";
import InputComponent from "../../../components/input/InputComponent";
import styles from "../Auth.module.css";

const LoginPage = () => {
  useAuthGuard();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response.data) dispatch(setCredentials({ ...response }));
    } catch (error) {
      console.log(error?.data?.message || error?.error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login Page</h2>
      <div className={styles.formContainer}>
        <FaUser className={styles.icon} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            label="Email"
            type="text"
            register={register}
            name="email"
            required
            errors={errors}
            icon={<FaEnvelope />}
          />
          <InputComponent
            label="Password"
            type="password"
            register={register}
            name="password"
            required
            errors={errors}
            icon={<FaLock />}
          />
          <div>
            <ButtonComponent style={"btnPrimary"} text={"Login"} />
          </div>
          <Link to={ROUTES.REGISTER} className={styles.link}>
            Don't have an account? Go to Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
