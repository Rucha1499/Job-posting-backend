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

const createJob = async (req, res) => {
  const { error } = jobValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const d = Date.now();
    const date = new Date(d);
    const dateString = date.toDateString();
    const job = {
      jobTitle: req.body.jobTitle,
      jobLocation: req.body.jobLocation,
      skills: req.body.skills,
      mode: req.body.mode,
      minStipend: req.body.minStipend,
      maxStipend: req.body.maxStipend,
      jobDuration: req.body.jobDuration,
      jobDescription: req.body.jobDescription,
      date: dateString,
    };
    await jobQuery.addJob(job);
    return res.json({ message: 'Job created successfully!' });
  } catch (err) {
    return res.status(502).json(err);
  }
};

module.exports = {
  getJobs,
  createJob,
};
