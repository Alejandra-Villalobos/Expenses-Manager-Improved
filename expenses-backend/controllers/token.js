const { findUser, validateToken } = require("../models/token");

module.exports.userAuth = async (req) => {
  try {
    const header_authorization = req.get("Authorization");

    if (!header_authorization) {
      throw new Error("Authorization needed");
    } //No hay token

    const token = header_authorization.split(" ")[1];

    const { rows } = await findUser({ content: token });
    if (!rows[0]) {
      throw new Error("Authorization failed"); //Token inválido
    }

    const verify = await validateToken({ content: token });
    if (!verify.rows[0].active) {
      throw new Error("Session expired");
    } //Token expirado

    return rows[0] //Token correcto

  } catch (error) {
    throw new Error(error.message)
  }
};