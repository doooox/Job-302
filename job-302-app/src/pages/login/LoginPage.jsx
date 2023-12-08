import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/slices/UserApiSlice";
import useAuthGuard from "../../hooks/useAuthGuard";
import { useForm } from "react-hook-form";
import { setCredentials } from "../../store/slices/AuthSlice";

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
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input {...register("email", { required: "Email is required" })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
