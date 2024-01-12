const { pool } = require('../utils/db');

module.exports.register = ({ name, email, password }) => {
  const bindings = [name, email, password];
  const SQL_INSERT_USER = `INSERT INTO USERS(NAME, EMAIL, PASSWORD)
                            VALUES($1, $2, $3)`;
  return pool.query(SQL_INSERT_USER, bindings);
};

module.exports.login = ({ email }) => {
  const bindings = [email];
  const SQL_SELECT_USER = `SELECT 
                                USER_ID, NAME, EMAIL, PASSWORD
                            FROM USERS
                            WHERE EMAIL = $1`;
  return pool.query(SQL_SELECT_USER, bindings);
};