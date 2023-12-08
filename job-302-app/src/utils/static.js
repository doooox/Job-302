export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
  PROFILE: "/profile",
};

export const ENDPOINTS = {
  REGISTER: "/user/register",
  LOGIN: "/user/login",
  PROFILE: "/user/profile",
  LOGOUT: "/user/logout",
};

export const NAVIGATION_ROUTES = [
  {
    name: "home",
    path: "/",
    perms: {
      guestOnly: true,
      requireAuth: false,
    },
  },
  {
    name: "login",
    path: "/login",
    perms: {
      guestOnly: true,
      requireAuth: false,
    },
  },
  {
    name: "register",
    path: "/register",
    perms: {
      guestOnly: true,
      requireAuth: false,
    },
  },
  {
    name: "logout",
    path: "/logout",
    perms: {
      guestOnly: false,
      requireAuth: true,
    },
  },
  {
    name: "update",
    path: "/update",
    perms: {
      guestOnly: false,
      requireAuth: true,
    },
  },
];
