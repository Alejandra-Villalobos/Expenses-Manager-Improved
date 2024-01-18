const { pool } = require('../utils/db');

module.exports.createBankAccount = ({ account, bank_name, currency, amount, user_id, username }) => {
    const bindings = [account, bank_name, currency, amount, user_id, username];
    const SQL_INSERT_BANK = `INSERT INTO BANK(ACCOUNT, BANK_NAME, CURRENCY, AMOUNT, USER_ID, USERNAME)
                                VALUES($1, $2, $3, $4, $5, $6)`;
    return pool.query(SQL_INSERT_BANK, bindings);
  };
  
  module.exports.fetchAllBanksFromUser = ({ user_id }) => {
    const bindings = [user_id];
    const SQL_SELECT_BANKS = `SELECT
                                  BANK_ID, ACCOUNT, BANK_NAME, CURRENCY, AMOUNT, USERNAME
                                  FROM BANK
                                  WHERE USER_ID = $1`;
    return pool.query(SQL_SELECT_BANKS, bindings);
  };
  
  module.exports.findBankById = ({ user_id, bank_id }) => {
    const bindings = [user_id, bank_id];
    const SQL_SELECT_BANK = `SELECT
                                  BANK_ID, ACCOUNT, BANK_NAME, CURRENCY, AMOUNT, USERNAME
                                  FROM BANK
                                  WHERE USER_ID = $1
                                  AND BANK_ID = $2`;
    return pool.query(SQL_SELECT_BANK, bindings);
  };

  module.exports.findAnyBankByAccountAndName = ({ account, bank_name }) => {
    const bindings = [account, bank_name];
    const SQL_SELECT_BANKS = `SELECT
                                  BANK_ID, ACCOUNT, BANK_NAME, CURRENCY, USER_ID
                                  FROM BANK
                                  WHERE ACCOUNT = $1
                                  AND BANK_NAME = $2`;
    return pool.query(SQL_SELECT_BANKS, bindings);
  };

  module.exports.findBankCurrency = ({ bank_id }) => {
    const bindings = [bank_id];
    const SQL_SELECT_BANKS = `SELECT
                                  BANK_ID, CURRENCY
                                  FROM BANK
                                  WHERE BANK_ID = $1`;
    return pool.query(SQL_SELECT_BANKS, bindings);
  };
  
  module.exports.updateAmount = ({ amount, bank_id }) => {
    const bindings = [amount, bank_id];
    const SQL_UPDATE_BANK = `UPDATE BANK 
                              SET AMOUNT = AMOUNT + $1
                              WHERE BANK_ID = $2`;
    return pool.query(SQL_UPDATE_BANK, bindings);
  };