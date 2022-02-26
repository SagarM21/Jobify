const createJob = async (req, res) => {
	res.send("Created job");
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
