import express from "express";
import userRoutes from "./userRoutes.js";
import companiesRouter from "./companiesRoutes.js";
import { getAllJobs } from "../controllers/jobs/jobsController.js";
import jobRouter from "./jobsRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/companies", companiesRouter);
router.use("/jobs", jobRouter);

export default router;
