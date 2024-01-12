const { pool } = require('../utils/db');

module.exports.createIncome = ({ category, description, amount, bank_id, user_id }) => {
    const bindings = [category, description, amount, bank_id, user_id];
    const SQL_INSERT_INCOME = `INSERT INTO INCOME(CATEGORY, DESCRIPTION, AMOUNT, BANK_ID, USER_ID)
                                VALUES($1, $2, $3, $4, $5)`;
    return pool.query(SQL_INSERT_INCOME, bindings);
  };
  
  module.exports.fetchAllIncomes = ({ user_id }) => {
    const bindings = [user_id];
    const SQL_SELECT_INCOMES = `SELECT CATEGORY, DESCRIPTION, AMOUNT, ADD_DATE, BANK_ID
                                  FROM INCOME
                                  WHERE USER_ID = $1`;
    return pool.query(SQL_SELECT_INCOMES, bindings);
  };
  
  module.exports.findIncomeById = ({ user_id, income_id }) => {
    const bindings = [user_id, income_id];
    const SQL_SELECT_INCOME = `SELECT CATEGORY, DESCRIPTION, AMOUNT, ADD_DATE, BANK_ID
                                  WHERE USER_ID = $1
                                  AND ID = :$2`;
    return pool.query(SQL_SELECT_INCOME, bindings);
  };