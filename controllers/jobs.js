const jobQuery = require('../models/jobs');
const { jobValidation } = require('../middlewares/validators/jobDetailsValidator');

const getJobs = async (req, res) => {
  try {
    const allJobs = await jobQuery.fetchJobs();
    if (allJobs.length) {
      return res.json(allJobs);
    }
    return res.json({ message: 'No jobs posted yet!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getJobById = async (req, res) => {
  try {
    const result = await jobQuery.fetchJob(req.params.id);
    const { job } = result;

    if (result.jobExists) {
      return res.json({
        message: 'Job returned successfully!',
        job,
      });
    }
    return res.json({ message: 'Job not found!' });
  } catch (err) {
    return err;
  }
};

const createJob = async (req, res) => {
  const { error } = jobValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const date = Date.now();
    const job = {
      ...req.body,
      date,
    };

    await jobQuery.addJob(job);
    return res.json({ message: 'Job created successfully!' });
  } catch (err) {
    return res.status(502).json(err);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
};
