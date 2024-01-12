const {
  createIncome,
  fetchAllIncomes,
  findIncomeById,
} = require("../models/income");
const { userAuth } = require("../controllers/token");

const { createIncomeSchema } = require("../validators/income")

module.exports.createIncome = async (req, res, next) => {
  const { category, description, amount, bank_id } = req.body;
  try {
    const authUser = await userAuth(req);
    await createIncomeSchema(category, description, amount);
    await createIncome({
      category,
      description,
      amount,
      bank_id,
      user_id: authUser.user_id,
    });
    res.status(200).json({ message: "Income created!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getIncomes = async (req, res, next) => {
  try {
    const authUser = await userAuth(req);
    const { rows } = await fetchAllIncomes({ user_id: authUser.user_id });
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getIncome = async (req, res, next) => {
  const { income_id } = req.params;
  try {
    const authUser = await userAuth(req);
    const { rows } = await findIncomeById({ user_id: authUser.user_id, income_id });
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
