const User = require("../models/user")
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { Unauthorized } = require('http-errors');

const authenticate = async (req, _, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw Unauthorized("Not authorized")
    }
    const token = authorization.split(' ')[1];
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw Unauthorized("Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw Unauthorized("Not authorized");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authenticate; 