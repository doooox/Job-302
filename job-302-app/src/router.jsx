import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./utils/static";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import LogoutPage from "./pages/logout/LogoutPage";
import UpdateUserPage from "./pages/update/UpdateUserPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.PROFILE} element={<UpdateUserPage />} />
      <Route path={ROUTES.LOGOUT} element={<LogoutPage />} />
    </Routes>
  );
};

export default AppRouter;
