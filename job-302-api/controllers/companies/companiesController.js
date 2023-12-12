import Company from "../../models/companies/CompanyModel.js";
import { errorMessage } from "../../utils/helpers.js";

export const getAllCompanies = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const totalCompanies = await Company.countDocuments();
  const totalPages = Math.ceil(totalCompanies / limit);

  const companies = await Company.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: "descending" })
    .populate("jobs");

  if (companies)
    return res.status(200).json({
      companies,
      totalCompanies,
      totalPages,
      currentPage: parseInt(page),
    });

  return res.status(404).json({ message: "No Companies Found!" });
};

export const getSingleCompany = async (req, res) => {
  const { id } = req.params;

  const company = await Company.findById(id).populate("jobs");

  if (company) return res.status(200).json(company);

  return res.status(404).json({ message: "No Company Found!" });
};

export const getFilteredCompanies = async (req, res) => {
  const { parameter } = req.query;

  const filteredCompanies = await Company.find({ location: parameter });

  if (filteredCompanies) return res.status(200).json(filteredCompanies);

  return errorMessage(res, 404, "No Companies Found");
};

export const getSearchedCompanies = async (req, res) => {
  const { search } = req.query;

  const searchedCompanies = await Company.find({
    name: { $regex: search, $options: "i" },
  }).sort({ createdAt: "descending" });
  return res.status(200).json(searchedCompanies);
};

export const addCompany = async (req, res) => {
  const { name, description, location } = req.body;

  if (!name || !description || !location)
    return res.status(400).json({ message: "Please fill all the fields" });

  const company = await Company.create({
    name,
    description,
    location,
  });

  if (company) return res.status(201).json(company);

  return res.status(400).json({ message: "Invalid input data" });
};

export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, description, location } = req.body;

  const company = await Company.findById(id);

  if (company) {
    company.name = name || company.name;
    company.description = description || company.description;
    company.location = location || company.location;
  }

  const updateCompany = await company.save();
  if (updateCompany) return res.status(200).json(updateCompany);

  return errorMessage(res, 400, "Invalid data");
};

export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  const deleteCompany = await Company.findByIdAndDelete(id);

  if (deleteCompany)
    return res.status(200).json({ message: "Company successfully deleted." });

  return res.status(404).json({ message: "No Company Found" });
};
