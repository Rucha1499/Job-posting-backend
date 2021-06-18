const joi = require('joi');

const jobValidation = (data) => {
  const schema = joi.object().keys({
    jobTitle: joi.string().required(),
    jobLocation: joi.string().optional(),
    isRemote: joi.boolean().required(),
    skills: joi.array().items(joi.string()).required(),
    mode: joi.array().items(joi.string()).required(),
    minStipend: joi.number().required(),
    maxStipend: joi.number().required(),
    startDate: joi.string().required(),
    jobDuration: joi.number().required(),
    jobDescription: joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  jobValidation,
};
