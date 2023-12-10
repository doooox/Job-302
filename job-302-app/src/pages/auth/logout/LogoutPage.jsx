import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useAuthGuard from "../../../hooks/useAuthGuard";
import { clearCredentials } from "../../../store/slices/AuthSlice";
import { useLogoutMutation } from "../../../store/slices/UserApiSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/static";

const LogoutPage = () => {
  useAuthGuard();

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (userInfo) {
      dispatch(clearCredentials());
      logout();
      navigate(ROUTES.HOME);
    }
  });

  return <div>LogoutPage</div>;
};

export default LogoutPage;
