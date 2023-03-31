const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { Conflict } = require('http-errors');

const signup = async (req, res) => {
  const { name, email, password, avatarURL } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Conflict(`Email ${email} in use`)
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ name, email, password: hashPassword, avatarURL });
  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
    }
  })
}

module.exports = signup;