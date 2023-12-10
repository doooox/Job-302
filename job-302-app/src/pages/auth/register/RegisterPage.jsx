import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

import { ROUTES } from "../../../utils/static";
import { useRegisterUserMutation } from "../../../store/slices/UserApiSlice";
import { setCredentials } from "../../../store/slices/AuthSlice";

import useAuthGuard from "../../../hooks/useAuthGuard";
import InputComponent from "../../../components/input/InputComponent";
import ButtonComponent from "../../../components/button/ButtonComponent";
import styles from "../Auth.module.css";

const RegisterPage = () => {
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

  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response.data) dispatch(setCredentials({ ...response }));
    } catch (error) {
      console.log(error?.data?.message || error?.error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Register Page</h2>
      <div className={styles.formContainer}>
        <FaUser className={styles.iconRegister} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            label="Username"
            register={register}
            name="username"
            required
            errors={errors}
            icon={<FaUser />}
          />
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
          <InputComponent
            label="Confirm Password"
            type="password"
            register={register}
            name="confirmPassword"
            required
            errors={errors}
            icon={<FaLock />}
          />
          <div>
            <ButtonComponent style={"btnPrimary"} text={"Register"} />
          </div>
          <Link to={ROUTES.LOGIN}>Have an account? Go to Login</Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
