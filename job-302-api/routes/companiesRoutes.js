import express from "express";
import {
  addCompany,
  deleteCompany,
  getAllCompanies,
  getFilteredCompanies,
  getSearchedCompanies,
  getSingleCompany,
  updateCompany,
} from "../controllers/companies/companiesController.js";
import { adminRoute, companiesRoute } from "../middleware/authMiddleware.js";

const companiesRouter = express.Router();

companiesRouter.get("/", getAllCompanies);
companiesRouter.post("/add", adminRoute, addCompany);
companiesRouter.get("/filter", getFilteredCompanies);
companiesRouter.get("/search", getSearchedCompanies);
companiesRouter.delete("/delete/:id", adminRoute, deleteCompany);
companiesRouter.get("/:id", getSingleCompany);
companiesRouter.put("/update/:id", companiesRoute, updateCompany);

export default companiesRouter;
