import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import useAuthGuard from "../../../hooks/useAuthGuard";
import { useUpdateUserMutation } from "../../../store/slices/UserApiSlice";
import { setCredentials } from "../../../store/slices/AuthSlice";
import styles from "../Auth.module.css";
import { FaEnvelope, FaUser } from "react-icons/fa";
import InputComponent from "../../../components/input/InputComponent";
import ButtonComponent from "../../../components/button/ButtonComponent";

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
    <div className={styles.container}>
      <h2 className={styles.heading}>Edit Profile</h2>
      <div className={styles.formContainer}>
        <FaUser className={styles.icon} />
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
          <div>
            <ButtonComponent style={"btnPrimary"} text={"Update"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPage;
