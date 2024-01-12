const Joi = require("joi");

module.exports.registerSchema = async (email, name, password) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).max(32).required(),
  });

  try {
    await schema.validateAsync({ email, name, password });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.loginSchema = async (email, password) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
  });

  try {
    await schema.validateAsync({ email, password });
  } catch (error) {
    throw new Error(error.message);
  }
};