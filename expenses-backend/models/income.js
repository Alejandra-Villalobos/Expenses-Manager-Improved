const { pool } = require("../utils/db");

module.exports.createIncome = ({
  category,
  description,
  amount,
  add_date,
  bank_id,
  user_id,
}) => {
  const bindings = [category, description, amount, add_date, bank_id, user_id];
  const SQL_INSERT_INCOME = `INSERT INTO INCOME(CATEGORY, DESCRIPTION, AMOUNT, ADD_DATE, BANK_ID, USER_ID)
                                VALUES($1, $2, $3, $4, $5, $6)`;
  return pool.query(SQL_INSERT_INCOME, bindings);
};

module.exports.fetchAllIncomes = ({ user_id }) => {
  const bindings = [user_id];
  const SQL_SELECT_INCOMES = `SELECT i.INCOME_ID, i.CATEGORY, i.DESCRIPTION, i.AMOUNT, i.ADD_DATE, b.bank_name, b.currency
                                  FROM INCOME i
                                  JOIN BANK b ON i.bank_id =b.bank_id 
                                  WHERE i.USER_ID = $1`;
  return pool.query(SQL_SELECT_INCOMES, bindings);
};

module.exports.findIncomeById = ({ user_id, income_id }) => {
  const bindings = [user_id, income_id];
  const SQL_SELECT_INCOME = `SELECT i.INCOME_ID, i.CATEGORY, i.DESCRIPTION, i.AMOUNT, i.ADD_DATE, b.bank_name, b.currency
                                  FROM INCOME i
                                  JOIN BANK b ON i.bank_id =b.bank_id 
                                  WHERE i.USER_ID = $1
                                  AND i.INCOME_ID = $2`;
  return pool.query(SQL_SELECT_INCOME, bindings);
};
