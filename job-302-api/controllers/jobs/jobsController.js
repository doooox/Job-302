import Job from "../../models/jobs/jobModel.js";
import Company from "../../models/companies/CompanyModel.js";
import { errorMessage } from "../../utils/helpers.js";
import { query } from "express";

export const getAllJobs = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const totalJobs = await Job.countDocuments();
  const totalPages = Math.ceil(totalJobs / limit);

  const jobs = await Job.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: "descending" })
    .populate("company", "_id, name");

  if (jobs)
    return res
      .status(200)
      .json({ jobs, totalJobs, totalPages, currentPage: parseInt(page) });

  return errorMessage(res, 404, "No Jobs Found");
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;

  if (!id) return errorMessage(res, 400, "Id is required");

  const singleJob = await Job.findById(id).populate("company", "id name");

  if (singleJob) return res.status(200).json(singleJob);

  return errorMessage(res, 404, "No Job Found");
};

export const getFilteredJobs = async (req, res) => {
  const { parameter } = req.query;

  const filteredJobs = await Job.find({
    $or: [
      { title: { $regex: parameter, $options: "i" } },
      { location: { $regex: parameter, $options: "i" } },
      { seniority: { $regex: parameter, $options: "i" } },
      { techStack: { $in: [parameter] } },
    ],
  });

  if (filteredJobs)
    return res.status(200).json(filteredJobs).sort({ createdAt: "descending" });

  return errorMessage(res, 404, "No jobs found");
};

export const addJob = async (req, res) => {
  const { title, description, location, seniority, techStack } = req.body;
  const { id } = req.params;

  const company = await Company.findById(id);

  if (!company) return errorMessage(res, 400, "No Company Found");

  const newJob = await Job.create({
    title,
    description,
    location,
    seniority,
    techStack,
    company: company._id,
  });

  company.jobs.push(newJob._id);
  await company.save();

  if (newJob) return res.status(201).json(newJob);

  return errorMessage(res, 400, "Invalid data");
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, seniority, techStack } = req.body;

  const job = await Job.findById(id);

  if (job) {
    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.seniority = seniority || job.seniority;
    job.techStack = techStack || job.techStack;
  }

  const updatedJob = await job.save();

  if (updatedJob) return res.status(200).json(updatedJob);
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!id) return errorMessage(res, 404, "Id not Found");

  const jobDeleted = await Job.findByIdAndDelete(id);

  if (jobDeleted)
    return res.status(200).json({ message: "Job Successfully Deleted" });
};
