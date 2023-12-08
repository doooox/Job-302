import useAuthGuard from "../../hooks/useAuthGuard";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useUpdateUserMutation } from "../../store/slices/UserApiSlice";
import { setCredentials } from "../../store/slices/AuthSlice";

const UpdateUserPage = () => {
  useAuthGuard();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    setValue("username", userInfo?.data.username);
    setValue("email", userInfo?.data.email);
  }, [setValue, userInfo]);

  const onSubmit = async (data) => {
    try {
      const response = await updateUser({
        _id: userInfo.data._id,
        username: data.username,
        email: data.email,
      });
      if (response) dispatch(setCredentials({ ...response }));
    } catch (error) {}
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input
            {...register("username", { required: "username is required" })}
          />
          {errors?.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input {...register("email", { required: "Email is required" })} />
          {errors?.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserPage;
