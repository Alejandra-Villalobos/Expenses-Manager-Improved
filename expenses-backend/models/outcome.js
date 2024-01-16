const { pool } = require("../utils/db");

module.exports.createOutcome = ({
  category,
  description,
  amount,
  add_date,
  to_bank_account,
  bank_id,
  user_id,
}) => {
  const bindings = [
    category,
    description,
    amount,
    add_date,
    to_bank_account,
    bank_id,
    user_id,
  ];
  const SQL_INSERT_OUTCOME = `INSERT INTO OUTCOME(CATEGORY, DESCRIPTION, AMOUNT, ADD_DATE, TO_BANK_ACCOUNT, BANK_ID, USER_ID)
                                VALUES($1, $2, $3, $4, $5, $6, $7)`;
  return pool.query(SQL_INSERT_OUTCOME, bindings);
};

module.exports.fetchAllOutcomes = ({ user_id }) => {
  const bindings = [user_id];
  const SQL_SELECT_OUTCOMES = `SELECT o.OUTCOME_ID, o.CATEGORY, o.DESCRIPTION, o.AMOUNT, o.ADD_DATE, b.CURRENCY, b.BANK_NAME as "bank_name", b2.ACCOUNT as "to_account", b2.BANK_NAME as "to_bank_name", b2.USERNAME as "to_username"
                                FROM OUTCOME o
                                JOIN BANK b ON o.BANK_ID =b.BANK_ID 
                                LEFT JOIN BANK b2 ON o.TO_BANK_ACCOUNT = b2.BANK_ID 
                                WHERE o.USER_ID = $1`;
  return pool.query(SQL_SELECT_OUTCOMES, bindings);
};

module.exports.findOutcomeById = ({ user_id, outcome_id }) => {
  const bindings = [user_id, outcome_id];
  const SQL_SELECT_OUTCOME = `SELECT o.OUTCOME_ID, o.CATEGORY, o.DESCRIPTION, o.AMOUNT, o.ADD_DATE, b.CURRENCY, b.BANK_NAME as "bank_name", b2.ACCOUNT as "to_account", b2.BANK_NAME as "to_bank_name", b2.USERNAME as "to_username"
                                  FROM OUTCOME o
                                  JOIN BANK b ON o.BANK_ID =b.BANK_ID 
                                  JOIN BANK b2 ON o.TO_BANK_ACCOUNT = b2.BANK_ID 
                                  WHERE o.USER_ID = $1
                                  AND OUTCOME_ID = $2`;
  return pool.query(SQL_SELECT_OUTCOME, bindings);
};
