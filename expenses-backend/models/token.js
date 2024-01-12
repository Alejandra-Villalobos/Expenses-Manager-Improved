const { pool } = require("../utils/db");

module.exports.createToken = ({ content, user_id, active }) => {
  const bindings = [content, user_id, active];
  const SQL_INSERT_TOKEN = `INSERT INTO TOKEN(CONTENT, USER_ID, ACTIVE)
                              VALUES($1, $2, $3)`;
  return pool.query(SQL_INSERT_TOKEN, bindings);
};

module.exports.findUser = ({ content }) => {
    const bindings = [content];
    const SQL_SELECT_USER = `SELECT USER_ID FROM TOKEN
                                WHERE CONTENT = $1`;
    return pool.query(SQL_SELECT_USER, bindings);
  };

  module.exports.validateToken = ({ content }) => {
    const bindings = [content];
    const SQL_SELECT_TOKEN = `SELECT ACTIVE FROM TOKEN
                                WHERE CONTENT = $1`;
    return pool.query(SQL_SELECT_TOKEN, bindings);
  };

module.exports.deactivateToken = ({ user_id }) => {
    const bindings = [user_id];
    const SQL_INSERT_TOKEN = `UPDATE TOKEN SET ACTIVE = FALSE
                                WHERE USER_ID = $1`;
    return pool.query(SQL_INSERT_TOKEN, bindings);
  };