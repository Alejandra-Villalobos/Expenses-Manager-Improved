const { pool } = require('../utils/db');

module.exports.createBankAccount = ({ account, name, currency, amount, user_id, username }) => {
    const bindings = [account, name, currency, amount, user_id, username];
    const SQL_INSERT_BANK = `INSERT INTO BANK(ACCOUNT, NAME, CURRENCY, AMOUNT, USER_ID, USERNAME)
                                VALUES($1, $2, $3, $4, $5, $6)`;
    return pool.query(SQL_INSERT_BANK, bindings);
  };
  
  module.exports.fetchAllBanksFromUser = ({ user_id }) => {
    const bindings = [user_id];
    const SQL_SELECT_BANKS = `SELECT
                                  BANK_ID, ACCOUNT, NAME, CURRENCY, AMOUNT, USERNAME
                                  FROM BANK
                                  WHERE USER_ID = $1`;
    return pool.query(SQL_SELECT_BANKS, bindings);
  };
  
  module.exports.findByBankId = ({ user_id, bank_id }) => {
    const bindings = [user_id, bank_id];
    const SQL_SELECT_BANK = `SELECT
                                  BANK_ID, ACCOUNT, NAME, CURRENCY, AMOUNT, USERNAME
                                  FROM BANK
                                  WHERE USER_ID = $1
                                  AND BANK_ID = $2`;
    return pool.query(SQL_SELECT_BANK, bindings);
  };

  module.exports.fetchAllBanks = () => {
    const SQL_SELECT_BANKS = `SELECT
                                  BANK_ID, ACCOUNT, NAME, CURRENCY, AMOUNT, USERNAME, USER_ID
                                  FROM BANK`;
    return pool.query(SQL_SELECT_BANKS);
  };
  
  module.exports.updateAmount = ({ amount, user_id, bank_id }) => {
    const bindings = [amount, user_id, bank_id];
    const SQL_UPDATE_BANK = `UPDATE BANK 
                              SET AMOUNT = AMOUNT + $1
                              WHERE USER_ID = $2 AND BANK_ID = $3`;
    return pool.query(SQL_UPDATE_BANK, bindings);
  };