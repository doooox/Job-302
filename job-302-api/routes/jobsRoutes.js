import express from "express";
import {
  addJob,
  deleteJob,
  getAllJobs,
  getFilteredJobs,
  getSingleJob,
  updateJob,
} from "../controllers/jobs/jobsController.js";
import { companiesRoute } from "../middleware/authMiddleware.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);
jobRouter.post("/add/:id", companiesRoute, addJob);
jobRouter.get("/filter", getFilteredJobs);
jobRouter.put("/update/:id", companiesRoute, updateJob);
jobRouter.get("/:id", getSingleJob);
jobRouter.delete("/:id", companiesRoute, deleteJob);
export default jobRouter;
