import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { ROUTES } from "../../utils/static";
import styles from "./NavigationComponent.module.css";
import ButtonComponent from "../button/ButtonComponent";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

const NavigationComponent = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const toggleMenuHandler = () => {
    setToggleMenu((prev) => !prev);
  };

  return (
    <>
      <nav className={styles.container}>
        <div onClick={() => navigate(ROUTES.HOME)}>
          <h1>JOB 302</h1>
        </div>
        <ul className={styles.navList}>
          {!userInfo ? (
            <>
              <li
                onClick={() => navigate(ROUTES.LOGIN)}
                className={styles.navLink}
              >
                <ButtonComponent style={"btnLink"} text={"Login"} />
              </li>
              <li
                onClick={() => navigate(ROUTES.REGISTER)}
                className={styles.navLink}
              >
                <ButtonComponent style={"btnLink"} text={"Register"} />
              </li>
            </>
          ) : (
            <>
              <div>
                {userInfo.data.email}
                <FaUser onClick={toggleMenuHandler} className={styles.icon} />
              </div>
              <div
                className={toggleMenu ? styles.menuActive : styles.menuHidden}
              >
                <li className={styles.navLink}>
                  <Link to={ROUTES.PROFILE} className={styles.menuItem}>
                    My profile
                  </Link>
                </li>
                <li className={styles.navLink}>
                  <Link to={ROUTES.LOGOUT} className={styles.menuItem}>
                    Logout
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default NavigationComponent;
