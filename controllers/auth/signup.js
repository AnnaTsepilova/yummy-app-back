const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Conflict(`Email ${email} in use`)
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ name, email, password: hashPassword });
  res.status(201).json({
    user: {
      id: result._id,
      name: result.name,
      email: result.email,
    }
  })
}

module.exports = signup;