const { db } = require('../firestore');

const jobModel = db.collection('jobs');

const fetchJobs = async () => {
  try {
    const snapshot = await jobModel.get();
    const allJobs = [];
    snapshot.forEach((doc) => {
      allJobs.push(doc.data());
    });
    return allJobs;
  } catch (err) {
    return err;
  }
};

const addJob = async (data) => {
  const savedJob = await jobModel.add(data);
  return savedJob;
};

module.exports = { fetchJobs, addJob };
