const {
  createOutcome,
  fetchAllOutcomes,
  findOutcomeById,
} = require("../models/outcome");
const { findAnyBankByAccountAndName, updateAmount } = require("../models/bank");
const { userAuth } = require("../controllers/token");
const { actualDate } = require("../utils/date");

const { createOutcomeSchema } = require("../validators/outcome");
const { createIncome } = require("../models/income");

const searchBank = async (account, bank_name) => {
  const { rows } = await findAnyBankByAccountAndName({
    account,
    bank_name,
  });
  if (!rows[0]) throw new Error("Bank not found");
  else return rows[0];
};

module.exports.createOutcome = async (req, res, next) => {
  const {
    category,
    description,
    amount,
    selected_date,
    to_account,
    to_bank,
    bank_id,
    sync_to_account,
  } = req.body;
  try {
    const authUser = await userAuth(req);
    await createOutcomeSchema(category, description, amount);
    const to_bank_account =
      to_account || to_bank ? await searchBank(to_account, to_bank) : null;
    const to_bank_account_id = to_bank_account ? to_bank_account.bank_id : null;
    const add_date = selected_date ? selected_date : actualDate();
    await createOutcome({
      category,
      description,
      amount,
      add_date,
      to_bank_account: to_bank_account_id,
      bank_id,
      user_id: authUser.user_id,
    });
    if (to_bank_account) {
      await createIncome({
        category,
        description: `Transfer from ${authUser.email}`,
        amount,
        add_date,
        bank_id: to_bank_account_id,
        user_id: to_bank_account.user_id,
      });
      if (sync_to_account) {
        await updateAmount({ amount, bank_id: to_bank_account_id });
      }
    }
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
