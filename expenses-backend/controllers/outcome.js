const {
  createOutcome,
  fetchAllOutcomes,
  findOutcomeById,
} = require("../models/outcome");
const { findAnyBankByAccountAndName } = require("../models/bank");
const { userAuth } = require("../controllers/token");

const { createOutcomeSchema } = require("../validators/outcome");

const searchBank = async (account, bank_name) => {
  const { rows } = await findAnyBankByAccountAndName({
    account,
    bank_name,
  });
  if (!rows[0]) throw new Error("Bank not found")
  else return rows[0].bank_id;
};

module.exports.createOutcome = async (req, res, next) => {
  const { category, description, amount, to_account, to_bank, bank_id } =
    req.body;
  try {
    const authUser = await userAuth(req);
    await createOutcomeSchema(category, description, amount);
    const to_bank_account = (to_account || to_bank) ? await searchBank(to_account, to_bank) : null
    await createOutcome({
      category,
      description,
      amount,
      to_bank_account,
      bank_id,
      user_id: authUser.user_id,
    });
    res.status(200).json({ message: "Outcome created!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getOutcomes = async (req, res, next) => {
  try {
    const authUser = await userAuth(req);
    const { rows } = await fetchAllOutcomes({ user_id: authUser.user_id });
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getOutcome = async (req, res, next) => {
  const { outcome_id } = req.params;
  try {
    const authUser = await userAuth(req);
    const { rows } = await findOutcomeById({
      user_id: authUser.user_id,
      outcome_id,
    });
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
