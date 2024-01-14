const {
  createBankAccount,
  fetchAllBanksFromUser,
  findBankById,
  updateAmount,
  findAnyBankByAccountAndName,
} = require("../models/bank");
const { userAuth } = require("../controllers/token");

const { createBankSchema, updateBankSchema } = require("../validators/bank");

module.exports.createBank = async (req, res, next) => {
  const { account, bank_name, currency, amount, username } = req.body;
  try {
    const authUser = await userAuth(req);
    await createBankSchema(account, bank_name, currency, amount, username);
    const { rows } = await findAnyBankByAccountAndName({
      account,
      bank_name,
    });
    if(rows[0]) return res.status(400).json({ message: "Bank account already exists" });
    await createBankAccount({
      account,
      bank_name,
      currency,
      amount,
      username,
      user_id: authUser.user_id,
    });
    res.status(200).json({ message: "Bank created!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getBanksFromUser = async (req, res, next) => {
  try {
    const authUser = await userAuth(req);
    const { rows } = await fetchAllBanksFromUser({ user_id: authUser.user_id });
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getOneBankFromUser = async (req, res, next) => {
  const { bank_id } = req.params;
  try {
    const authUser = await userAuth(req);
    const { rows } = await findBankById({ user_id: authUser.user_id, bank_id });
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateBank = async (req, res, next) => {
  const { bank_id } = req.params;
  const { amount } = req.body;
  try {
    await userAuth(req);
    await updateBankSchema(amount);
    await updateAmount({ amount, bank_id });
    res.status(200).json({ message: "Amount updated!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
