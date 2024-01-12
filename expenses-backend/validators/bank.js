const Joi = require("joi");

module.exports.createBankSchema = async (account, bank_name, currency, amount, username) => {
  const schema = Joi.object({
    account: Joi.string().alphanum().min(8).max(15).required(),
    bank_name: Joi.string().required(),
    currency: Joi.string().required(),
    amount: Joi.number().positive().required(),
    username: Joi.string().required()
  });

  try {
    await schema.validateAsync({ account, bank_name, currency, amount, username });
  } catch (error) {
    throw new Error(error.message);
    
  }
};

module.exports.updateBankSchema = async (amount) => {
    const schema = Joi.object({
      amount: Joi.number().required(),
    });
  
    try {
      await schema.validateAsync({ amount });
    } catch (error) {
      throw new Error(error.message);
    }
  };