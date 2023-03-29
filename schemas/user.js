const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5).max(30),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5).max(30),
});

module.exports = {
  signupSchema,
  signinSchema
}