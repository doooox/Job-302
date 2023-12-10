import { useLocation, useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES, ROUTES } from "../utils/static";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useAuthGuard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // const user = false;
  const location = useLocation();
  const access = NAVIGATION_ROUTES.find(
    (route) => route.path === location.pathname
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!access) return;
    if (!userInfo && access.perms.requireAuth) {
      navigate(ROUTES.LOGIN);
      return;
    }
    if (userInfo && access.perms.guestOnly) {
      navigate(-1);
      return;
    }
  }, []);
};

export default useAuthGuard;
