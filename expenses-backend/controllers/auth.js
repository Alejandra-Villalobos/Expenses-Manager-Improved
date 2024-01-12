const { register, login } = require("../models/user");
const { createToken, deactivateToken } = require("../models/token");
const { userAuth } = require("../controllers/token");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerSchema, loginSchema } = require("../validators/auth");

const generateToken = async (user) => {
  const token = jwt.sign(user, "afneinf");
  await createToken({ content: token, user_id: user.user_id, active: true });
  return token;
};

module.exports.logout = async (req, res, next) => {
  try {
    const authUser = await userAuth(req);
    if (authUser) {
      await deactivateToken({ user_id: authUser.user_id });
      return res.status(200).json({ message: "Out!" });
    }
    res.status(400).json({ message: "Invalid Token" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.register = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    await registerSchema(email, name, password)
    const password_hash = await bcryptjs.hash(password, 12);
    await register({ email, name, password: password_hash });
    res.status(200).json({ message: "User created!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await loginSchema(email, password);
    const { rows } = await login({ email });
    if (rows.length) {
      const { user_id, name, password: password_hash, email } = rows[0];
      const password_is_valid = await bcryptjs.compare(password, password_hash);
      if (password_is_valid) {
        const data_user = { user_id, email, name };
        var token = await generateToken(data_user);
        if (token == null) return res.status(400).json({ message: error });
        return res.status(200).json({ data: data_user, token });
      }
    }
    res.status(400).json({ message: "Error: email or password not valid" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};