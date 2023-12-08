import React, { useEffect } from "react";
import useAuthGuard from "../../hooks/useAuthGuard";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../store/slices/AuthSlice";
import { useLogoutMutation } from "../../store/slices/UserApiSlice";

const LogoutPage = () => {
  useAuthGuard();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (userInfo) {
      dispatch(clearCredentials());
      logout();
    }
  }, []);

  return <div>LogoutPage</div>;
};

export default LogoutPage;
