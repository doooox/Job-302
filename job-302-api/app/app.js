import express from "express";
import router from "../routes/router.js";

export const createApp = () => {
  const app = express();
  app.use("/api", router);

  return app;
};
