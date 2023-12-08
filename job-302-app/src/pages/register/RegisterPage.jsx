import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../store/slices/UserApiSlice";
import { setCredentials } from "../../store/slices/AuthSlice";
import useAuthGuard from "../../hooks/useAuthGuard";

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
      const response = await registerUser(data).unwrap();
      if (response.data) dispatch(setCredentials({ ...response }));
    } catch (error) {
      console.log(error?.data?.message || error?.error);
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input
            {...register("username", { required: "username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
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
          <label>confirmPassword:</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "confirmPassword is required",
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
