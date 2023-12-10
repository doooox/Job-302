import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./utils/static";
import HomePage from "./pages/home/HomePage";

import RegisterPage from "./pages/auth/register/RegisterPage";
import LoginPage from "./pages/auth/login/LoginPage";
import LogoutPage from "./pages/auth/logout/LogoutPage";
import UpdateUserPage from "./pages/auth/update/UpdateUserPage";
import NavigationComponent from "./components/navigation/NavigationComponent";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<NavigationComponent />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.PROFILE} element={<UpdateUserPage />} />
        <Route path={ROUTES.LOGOUT} element={<LogoutPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
