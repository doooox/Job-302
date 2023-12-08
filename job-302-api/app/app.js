import express from "express";
import router from "../routes/router.js";
import { connectDB } from "../services/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CorsOptions } from "../utils/static.js";

export const createApp = () => {
  connectDB();
  const app = express();

  app.use(cors(CorsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set("trust proxy", 1);
  app.use(cookieParser());
  app.use("/api", router);

  return app;
};
