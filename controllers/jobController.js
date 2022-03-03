import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createJob = async (req, res) => {
	const { position, company } = req.body;

	if (!position || !company) {
		throw new BadRequestError("Please provide all values");
	}
	req.body.createdBy = req.user.userId;

	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
	res.send("Deleted job");
};

const getAllJobs = async (req, res) => {
	res.send("All jobs");
};

const updateJob = async (req, res) => {
	res.send("Job updated");
};

const showStats = async (req, res) => {
	res.send("Stats are here");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
