const express = require('express');

const router = express.Router();
const jobsController = require('../controllers/jobs');

router.get('/', jobsController.getJobs);
router.post('/createJob', jobsController.createJob);

module.exports = router;
