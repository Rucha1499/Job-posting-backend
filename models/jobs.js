const { db } = require('../firestore');

const jobModel = db.collection('jobs');

const fetchJob = async (jobId) => {
  try {
    const job = await jobModel.doc(jobId).get();
    const jobData = job.data();
    const { id } = job;

    return {
      jobExists: !!jobData,
      job: {
        id,
        ...jobData,
      },
    };
  } catch (err) {
    return err;
  }
};

const fetchJobs = async () => {
  try {
    const snapshot = await jobModel.get();
    const allJobs = [];
    snapshot.forEach((doc) => {
      allJobs.push({ id: doc.id, ...doc.data() });
    });
    return allJobs;
  } catch (err) {
    return err;
  }
};

const addJob = async (data) => {
  const { minStipend, maxStipend, jobDuration } = data;
  const body = {
    ...data,
    minStipend: Number(minStipend),
    maxStipend: Number(maxStipend),
    jobDuration: Number(jobDuration),
  };
  const savedJob = await jobModel.add(body);
  return savedJob;
};

module.exports = { fetchJob, fetchJobs, addJob };
