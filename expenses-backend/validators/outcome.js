const Joi = require("joi");

module.exports.createOutcomeSchema = async (category, description, amount) => {
  const schema = Joi.object({
    category: Joi.string().max(10).required(),
    description: Joi.string().max(50),
    amount: Joi.number().required()
  });

  try {
    await schema.validateAsync({ category, description, amount });
  } catch (error) {
    throw new Error(error.message);
    
  }
};