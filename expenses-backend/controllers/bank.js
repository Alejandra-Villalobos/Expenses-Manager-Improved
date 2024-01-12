const { createBankAccount, fetchAllBanksFromUser, findByBankId, fetchAllBanks, updateAmount } = require('../models/bank');
const { userAuth } = require('../controllers/token')

module.exports.createBank = async (req, res, next) => {
    await userAuth(req);
    const {account, name, currency, amount, username, user_id} = req.body;
    try {
      await createBankAccount({account, name, currency, amount, username, user_id});
      res.status(200).json({ message: 'Bank created!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  module.exports.getBanks = async (req, res, next) => {
    const authUser = await userAuth(req);
    try {
      const { rows } = await fetchAllBanksFromUser({ user_id: authUser.user_id });
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  module.exports.getBank = async (req, res, next) => {
    const authUser = await userAuth(req);
    const { bank_id } = req.params;
    try {
      const { rows } = await findByBankId({ user_id: authUser.user_id, bank_id });
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  module.exports.getAllBanks = async (req, res, next) => {
    await userAuth(req);
    try {
      const { rows } = await fetchAllBanks;
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  module.exports.updateBank = async (req, res, next) => {
    const authUser = await userAuth(req);
    const { bank_id } = req.params;
    const { amount } = req.body;
    try {
      await updateAmount({ amount, user_id: authUser.user_id, bank_id });
      res.status(200).json({ message: 'Amount updated!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };