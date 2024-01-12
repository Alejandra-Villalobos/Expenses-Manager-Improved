const { pool } = require('../utils/db');

module.exports.createOutcome = ({ category, description, amount, to_account, to_bank, bank_id, user_id }) => {
    const bindings = [category, description, amount, to_account, to_bank, bank_id, user_id];
    const SQL_INSERT_OUTCOME = `INSERT INTO OUTCOME(CATEGORY, DESCRIPTION, AMOUNT, TO_ACCOUNT, TO_BANK, BANK_ID, USER_ID)
                                VALUES($1, $2, $3, $4, $5, $6, $7)`;
    return pool.query(SQL_INSERT_OUTCOME, bindings);
  };
  
  module.exports.fetchAllOutcomes = ({ user_id }) => {
    const bindings = [user_id];
    const SQL_SELECT_OUTCOMES = `SELECT CATEGORY, DESCRIPTION, AMOUNT, TO_ACCOUNT, TO_BANK, BANK_ID, USER_ID
                                  FROM OUTCOME
                                  WHERE USER_ID = $1`;
    return pool.query(SQL_SELECT_OUTCOMES, bindings);
  };
  
  module.exports.findOutcomeById = ({ user_id, outcome_id }) => {
    const bindings = [user_id, outcome_id];
    const SQL_SELECT_OUTCOME = `SELECT CATEGORY, DESCRIPTION, AMOUNT, TO_ACCOUNT, TO_BANK, BANK_ID, USER_ID
                                  WHERE USER_ID = $1
                                  AND ID = :$2`;
    return pool.query(SQL_SELECT_OUTCOME, bindings);
  };